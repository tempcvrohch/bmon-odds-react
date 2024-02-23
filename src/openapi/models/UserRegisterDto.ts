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
 * A request body for a user registration
 * @export
 * @interface UserRegisterDto
 */
export interface UserRegisterDto {
    /**
     * 
     * @type {string}
     * @memberof UserRegisterDto
     */
    username?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRegisterDto
     */
    password?: string;
}

/**
 * Check if a given object implements the UserRegisterDto interface.
 */
export function instanceOfUserRegisterDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UserRegisterDtoFromJSON(json: any): UserRegisterDto {
    return UserRegisterDtoFromJSONTyped(json, false);
}

export function UserRegisterDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRegisterDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'username': !exists(json, 'username') ? undefined : json['username'],
        'password': !exists(json, 'password') ? undefined : json['password'],
    };
}

export function UserRegisterDtoToJSON(value?: UserRegisterDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'username': value.username,
        'password': value.password,
    };
}

