import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EtherscanService {
    constructor(private readonly httpService: HttpService) { }

    getAccountBalance(address: string): Observable<any> {
        const params = {
            module: 'account',
            action: 'balance',
            address,
            tag: 'latest',
            apikey: process.env.ETHERS_API_2,
        };

        return this.httpService.get(process.env.ETHERS_URL, { params }).pipe(
            map(response => {
                const resultWei = response.data.result;
                console.log({ resultWei })
                const resultEther = parseFloat(resultWei) / 1e18;

                return resultEther;
            })
        );
    }

    getEthPrice(): Observable<any> {
        const params = {
            module: 'stats',
            action: 'ethprice',
            apikey: process.env.ETHERS_API_2,
        };

        const euroParams = {
            app_id: process.env.EXCHANGE_RATES_KEY
        }


        const usdPrice = this.httpService.get(process.env.ETHERS_URL, { params }).pipe(
            map(response => parseFloat(response.data.result.ethusd))
        );

        const euroExchange = this.httpService.get(process.env.EXCHANGE_RATES_URL, { params: euroParams }).pipe(
            map(response => response.data.rates.EUR)
        );

        return forkJoin({
            usd: usdPrice,
            euro: euroExchange,
        }).pipe(
            map((result: { usd: any; euro: any }) => {
                const euroPrice = result.usd / result.euro;
                return { usd: result.usd, euro: euroPrice };
            })
        );
    }

    isWalletOld(address: string): Observable<any> {
        const params = {
            module: 'account',
            action: 'txlist',
            address,
            sort: 'asc',
            apikey: process.env.ETHERS_API_2,
        };

        return this.httpService.get(process.env.ETHERS_URL, { params }).pipe(
            map(response => {
                const transactions = response.data.result

                if (transactions.length > 0) {
                    const firstTransactionTimestamp = parseInt(transactions[0].timeStamp) * 1000;
                    console.log(firstTransactionTimestamp)

                    const now = new Date().getTime();
                    const age = now - firstTransactionTimestamp;

                    const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;

                    return age >= oneYearInMilliseconds;
                }
                return false;
            })
        );
    }

}
