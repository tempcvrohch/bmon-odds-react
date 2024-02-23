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


import * as runtime from '../runtime';
import type {
  SportDto1,
} from '../models/index';
import {
    SportDto1FromJSON,
    SportDto1ToJSON,
} from '../models/index';

/**
 * 
 */
export class SportsApi extends runtime.BaseAPI {

    /**
     * Get all sports.
     */
    async getAllSportsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<SportDto1>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/sports`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(SportDto1FromJSON));
    }

    /**
     * Get all sports.
     */
    async getAllSports(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<SportDto1>> {
        const response = await this.getAllSportsRaw(initOverrides);
        return await response.value();
    }

}