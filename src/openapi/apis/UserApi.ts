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
  BetDto,
  UserDto,
  UserRegisterDto,
} from '../models/index.js';
import {
    BetDtoFromJSON,
    BetDtoToJSON,
    UserDtoFromJSON,
    UserDtoToJSON,
    UserRegisterDtoFromJSON,
    UserRegisterDtoToJSON,
} from '../models/index.js';

export interface LoginRequest {
    username?: string;
    password?: string;
}

export interface RegisterRequest {
    userRegisterDto: UserRegisterDto;
}

/**
 * 
 */
export class UserApi extends runtime.BaseAPI {

    /**
     * Get user pending bets.
     */
    async getUserBetsPendingRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<BetDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/bets/pending`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(BetDtoFromJSON));
    }

    /**
     * Get user pending bets.
     */
    async getUserBetsPending(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<BetDto>> {
        const response = await this.getUserBetsPendingRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get current logged-in user.
     */
    async getUserSessionRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/session`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     * Get current logged-in user.
     */
    async getUserSession(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto> {
        const response = await this.getUserSessionRaw(initOverrides);
        return await response.value();
    }

    /**
     * Logs the user in
     */
    async loginRaw(requestParameters: LoginRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'application/x-www-form-urlencoded' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.username !== undefined) {
            formParams.append('username', requestParameters.username as any);
        }

        if (requestParameters.password !== undefined) {
            formParams.append('password', requestParameters.password as any);
        }

        const response = await this.request({
            path: `/auth/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Logs the user in
     */
    async login(requestParameters: LoginRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.loginRaw(requestParameters, initOverrides);
    }

    /**
     * Logs the user out
     */
    async logoutRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/logout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Logs the user out
     */
    async logout(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.logoutRaw(initOverrides);
    }

    /**
     * register a new user.
     */
    async registerRaw(requestParameters: RegisterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>> {
        if (requestParameters.userRegisterDto === null || requestParameters.userRegisterDto === undefined) {
            throw new runtime.RequiredError('userRegisterDto','Required parameter requestParameters.userRegisterDto was null or undefined when calling register.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/auth/register`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserRegisterDtoToJSON(requestParameters.userRegisterDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     * register a new user.
     */
    async register(requestParameters: RegisterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto> {
        const response = await this.registerRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
