/* tslint:disable */
/* eslint-disable */
/**
 * BetMonitor for generating matches and Odds
 * The server for simulating a betting portal.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime.js';
import type {
  MarketStateDto1,
} from '../models/index.js';
import {
    MarketStateDto1FromJSON,
    MarketStateDto1ToJSON,
} from '../models/index.js';

export interface GetLatestMarketsByMatchIdRequest {
    id: number;
}

/**
 * 
 */
export class MarketsApi extends runtime.BaseAPI {

    /**
     * Get the latest market states on match.
     */
    async getLatestMarketsByMatchIdRaw(requestParameters: GetLatestMarketsByMatchIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<MarketStateDto1>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getLatestMarketsByMatchId.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/match/{id}/markets/latest`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MarketStateDto1FromJSON));
    }

    /**
     * Get the latest market states on match.
     */
    async getLatestMarketsByMatchId(requestParameters: GetLatestMarketsByMatchIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<MarketStateDto1>> {
        const response = await this.getLatestMarketsByMatchIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
