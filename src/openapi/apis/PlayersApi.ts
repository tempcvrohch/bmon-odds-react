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
  PlayerDto1,
} from '../models/index';
import {
    PlayerDto1FromJSON,
    PlayerDto1ToJSON,
} from '../models/index';

/**
 * 
 */
export class PlayersApi extends runtime.BaseAPI {

    /**
     * Get all players.
     */
    async getAllPlayersRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PlayerDto1>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/players`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PlayerDto1FromJSON));
    }

    /**
     * Get all players.
     */
    async getAllPlayers(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PlayerDto1>> {
        const response = await this.getAllPlayersRaw(initOverrides);
        return await response.value();
    }

}
