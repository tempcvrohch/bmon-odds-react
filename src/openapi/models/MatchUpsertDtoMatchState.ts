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
/**
 * A change during a match, most likely in points.
 * @export
 * @interface MatchUpsertDtoMatchState
 */
export interface MatchUpsertDtoMatchState {
    /**
     * 
     * @type {string}
     * @memberof MatchUpsertDtoMatchState
     */
    pointScore?: string;
    /**
     * 
     * @type {number}
     * @memberof MatchUpsertDtoMatchState
     */
    servingIndex?: number;
    /**
     * 
     * @type {string}
     * @memberof MatchUpsertDtoMatchState
     */
    setScore?: string;
}

/**
 * Check if a given object implements the MatchUpsertDtoMatchState interface.
 */
export function instanceOfMatchUpsertDtoMatchState(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MatchUpsertDtoMatchStateFromJSON(json: any): MatchUpsertDtoMatchState {
    return MatchUpsertDtoMatchStateFromJSONTyped(json, false);
}

export function MatchUpsertDtoMatchStateFromJSONTyped(json: any, ignoreDiscriminator: boolean): MatchUpsertDtoMatchState {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'pointScore': !exists(json, 'pointScore') ? undefined : json['pointScore'],
        'servingIndex': !exists(json, 'servingIndex') ? undefined : json['servingIndex'],
        'setScore': !exists(json, 'setScore') ? undefined : json['setScore'],
    };
}

export function MatchUpsertDtoMatchStateToJSON(value?: MatchUpsertDtoMatchState | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'pointScore': value.pointScore,
        'servingIndex': value.servingIndex,
        'setScore': value.setScore,
    };
}

