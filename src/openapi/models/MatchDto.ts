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

import { exists, mapValues } from '../runtime';
import type { LeagueDto } from './LeagueDto';
import {
    LeagueDtoFromJSON,
    LeagueDtoFromJSONTyped,
    LeagueDtoToJSON,
} from './LeagueDto';
import type { MatchStateDto } from './MatchStateDto';
import {
    MatchStateDtoFromJSON,
    MatchStateDtoFromJSONTyped,
    MatchStateDtoToJSON,
} from './MatchStateDto';
import type { SportDto1 } from './SportDto1';
import {
    SportDto1FromJSON,
    SportDto1FromJSONTyped,
    SportDto1ToJSON,
} from './SportDto1';

/**
 * 
 * @export
 * @interface MatchDto
 */
export interface MatchDto {
    /**
     * 
     * @type {number}
     * @memberof MatchDto
     */
    id: number;
    /**
     * 
     * @type {Date}
     * @memberof MatchDto
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof MatchDto
     */
    updatedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof MatchDto
     */
    name: string;
    /**
     * 
     * @type {boolean}
     * @memberof MatchDto
     */
    live?: boolean;
    /**
     * 
     * @type {LeagueDto}
     * @memberof MatchDto
     */
    league?: LeagueDto;
    /**
     * 
     * @type {SportDto1}
     * @memberof MatchDto
     */
    sport?: SportDto1;
    /**
     * 
     * @type {MatchStateDto}
     * @memberof MatchDto
     */
    matchState?: MatchStateDto;
    /**
     * 
     * @type {Array<MatchStateDto>}
     * @memberof MatchDto
     */
    matchStates?: Array<MatchStateDto>;
}

/**
 * Check if a given object implements the MatchDto interface.
 */
export function instanceOfMatchDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function MatchDtoFromJSON(json: any): MatchDto {
    return MatchDtoFromJSONTyped(json, false);
}

export function MatchDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MatchDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'updatedAt': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
        'name': json['name'],
        'live': !exists(json, 'live') ? undefined : json['live'],
        'league': !exists(json, 'league') ? undefined : LeagueDtoFromJSON(json['league']),
        'sport': !exists(json, 'sport') ? undefined : SportDto1FromJSON(json['sport']),
        'matchState': !exists(json, 'matchState') ? undefined : MatchStateDtoFromJSON(json['matchState']),
        'matchStates': !exists(json, 'matchStates') ? undefined : ((json['matchStates'] as Array<any>).map(MatchStateDtoFromJSON)),
    };
}

export function MatchDtoToJSON(value?: MatchDto | null): any {
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
        'name': value.name,
        'live': value.live,
        'league': LeagueDtoToJSON(value.league),
        'sport': SportDto1ToJSON(value.sport),
        'matchState': MatchStateDtoToJSON(value.matchState),
        'matchStates': value.matchStates === undefined ? undefined : ((value.matchStates as Array<any>).map(MatchStateDtoToJSON)),
    };
}
