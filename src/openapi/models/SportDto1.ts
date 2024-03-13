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
/**
 * 
 * @export
 * @interface SportDto1
 */
export interface SportDto1 {
    /**
     * 
     * @type {number}
     * @memberof SportDto1
     */
    id: number;
    /**
     * 
     * @type {Date}
     * @memberof SportDto1
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof SportDto1
     */
    updatedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof SportDto1
     */
    name: string;
}

/**
 * Check if a given object implements the SportDto1 interface.
 */
export function instanceOfSportDto1(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function SportDto1FromJSON(json: any): SportDto1 {
    return SportDto1FromJSONTyped(json, false);
}

export function SportDto1FromJSONTyped(json: any, ignoreDiscriminator: boolean): SportDto1 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'updatedAt': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
        'name': json['name'],
    };
}

export function SportDto1ToJSON(value?: SportDto1 | null): any {
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
    };
}

