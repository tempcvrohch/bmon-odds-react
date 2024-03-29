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

import { exists, mapValues } from '../runtime.js';
import type { MarketDto } from './MarketDto.js';
import {
    MarketDtoFromJSON,
    MarketDtoFromJSONTyped,
    MarketDtoToJSON,
} from './MarketDto.js';
import type { PlayerDto1 } from './PlayerDto1.js';
import {
    PlayerDto1FromJSON,
    PlayerDto1FromJSONTyped,
    PlayerDto1ToJSON,
} from './PlayerDto1.js';

/**
 * 
 * @export
 * @interface MarketStateDto1
 */
export interface MarketStateDto1 {
    /**
     * 
     * @type {number}
     * @memberof MarketStateDto1
     */
    id: number;
    /**
     * 
     * @type {Date}
     * @memberof MarketStateDto1
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof MarketStateDto1
     */
    updatedAt?: Date;
    /**
     * 
     * @type {number}
     * @memberof MarketStateDto1
     */
    odd: number;
    /**
     * 
     * @type {boolean}
     * @memberof MarketStateDto1
     */
    suspended: boolean;
    /**
     * 
     * @type {number}
     * @memberof MarketStateDto1
     */
    stakeLimit?: number;
    /**
     * 
     * @type {MarketDto}
     * @memberof MarketStateDto1
     */
    market?: MarketDto;
    /**
     * 
     * @type {PlayerDto1}
     * @memberof MarketStateDto1
     */
    player?: PlayerDto1;
}

/**
 * Check if a given object implements the MarketStateDto1 interface.
 */
export function instanceOfMarketStateDto1(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "odd" in value;
    isInstance = isInstance && "suspended" in value;

    return isInstance;
}

export function MarketStateDto1FromJSON(json: any): MarketStateDto1 {
    return MarketStateDto1FromJSONTyped(json, false);
}

export function MarketStateDto1FromJSONTyped(json: any, ignoreDiscriminator: boolean): MarketStateDto1 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'updatedAt': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
        'odd': json['odd'],
        'suspended': json['suspended'],
        'stakeLimit': !exists(json, 'stakeLimit') ? undefined : json['stakeLimit'],
        'market': !exists(json, 'market') ? undefined : MarketDtoFromJSON(json['market']),
        'player': !exists(json, 'player') ? undefined : PlayerDto1FromJSON(json['player']),
    };
}

export function MarketStateDto1ToJSON(value?: MarketStateDto1 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'created_at': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updated_at': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'odd': value.odd,
        'suspended': value.suspended,
        'stakeLimit': value.stakeLimit,
        'market': MarketDtoToJSON(value.market),
        'player': PlayerDto1ToJSON(value.player),
    };
}

