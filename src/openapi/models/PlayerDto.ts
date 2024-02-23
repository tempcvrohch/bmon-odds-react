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
 * 
 * @export
 * @interface PlayerDto
 */
export interface PlayerDto {
    /**
     * 
     * @type {number}
     * @memberof PlayerDto
     */
    id: number;
    /**
     * 
     * @type {Date}
     * @memberof PlayerDto
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof PlayerDto
     */
    updatedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof PlayerDto
     */
    firstname: string;
    /**
     * 
     * @type {string}
     * @memberof PlayerDto
     */
    lastname: string;
    /**
     * 
     * @type {string}
     * @memberof PlayerDto
     */
    slug?: string;
    /**
     * 
     * @type {string}
     * @memberof PlayerDto
     */
    countryCode: string;
}

/**
 * Check if a given object implements the PlayerDto interface.
 */
export function instanceOfPlayerDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "firstname" in value;
    isInstance = isInstance && "lastname" in value;
    isInstance = isInstance && "countryCode" in value;

    return isInstance;
}

export function PlayerDtoFromJSON(json: any): PlayerDto {
    return PlayerDtoFromJSONTyped(json, false);
}

export function PlayerDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlayerDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'updatedAt': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
        'firstname': json['firstname'],
        'lastname': json['lastname'],
        'slug': !exists(json, 'slug') ? undefined : json['slug'],
        'countryCode': json['countryCode'],
    };
}

export function PlayerDtoToJSON(value?: PlayerDto | null): any {
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
        'firstname': value.firstname,
        'lastname': value.lastname,
        'slug': value.slug,
        'countryCode': value.countryCode,
    };
}
