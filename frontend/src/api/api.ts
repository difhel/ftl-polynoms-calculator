// const BASE_URL: string = "https://travel-agent-prod.difhel.dev/"
const BASE_URL: string = "http://localhost:4242"

type APIResponse<ok extends boolean, T extends any> = ok extends true ? {
    ok: true;
    response: T;
} : {
    ok: false;
    error: string;
};

export class API {
    baseURL: string = BASE_URL;
    constructor(baseURL: string | undefined = undefined) {
        if (baseURL !== undefined) {
            this.baseURL = baseURL;
        }
    }
    #getResponse<T extends any>(response: any, wrap: boolean = false) {
        if (response.detail) {
            return {
                ok: false,
                error: response.detail
            } as APIResponse<false, T>;
        } else {
            return {
                ok: true,
                response: wrap? response : response.response as T
            } as APIResponse<true, T>;
        }
    }
    async #getResourse(
        method: string,
        query_params: Record<string, any> = {}
    ) {
        try {
            const query = new URLSearchParams(query_params).toString();
            // debugger;
            const response = await fetch(`${BASE_URL}/${method}?${query}`);
            return await response.json();
        } catch (e) {
            console.warn(e);
        }
    }
    async #postResourse(
        method: string,
        body: Record<string, any> = {},
        query_params: Record<string, any> = {}
    ) {
        const query = new URLSearchParams(query_params).toString();
        const response = await fetch(`${BASE_URL}/${method}?${query}`, {
            method: "POST",
            body: JSON.stringify(body),
        });
        return await response.json();
    }
    async getEquality(lhs: string, rhs: string) {
        return this.#getResponse<boolean>(
            await this.#getResourse(
                "compare",
                { lhs, rhs }
            )
        );
    }
    async insert(polynom: string) {
        return this.#getResponse<string>(
            await this.#getResourse("insert", {polynom})
        );
    }
    async list() {
        let res = this.#getResponse<string[]>(
            await this.#getResourse("list")
        );
        if (res.ok && (res as any) === null) res.response = [] as string[];
        return res;
    }
    async delete(polynom: string) {
        return this.#getResponse<string>(
            await this.#getResourse("delete", {polynom})
        )
    }
    async add(lhs: string, rhs: string) {
        return this.#getResponse<string>(
            await this.#getResourse("add", {lhs, rhs})
        )
    }
    async multiply(lhs: string, rhs: string) {
        return this.#getResponse<string>(
            await this.#getResourse("multiply", {lhs, rhs})
        )
    }
    async divide(lhs: string, rhs: string) {
        return this.#getResponse<{
            div: string,
            mod: string
        }>(
            await this.#getResourse("divide", {lhs, rhs}),
            true
        )
    }
    async compare(lhs: string, rhs: string) {
        return this.#getResponse<boolean>(
            await this.#getResourse("compare", {lhs, rhs})
        )
    }
    async getTheNthDerivative(polynom: string, target: string, nth: number) {
        return this.#getResponse<string>(
            await this.#getResourse("getTheNthDerivative", {polynom, target, nth})
        )
    }
    async getRoots(polynom: string) {
        return this.#getResponse<number[]>(
            await this.#getResourse("findRoots", {polynom})
        )
    }
    async getValueAtPoint(polynom: string, point: number[]) {
        return this.#getResponse<number>(
            await this.#getResourse("calculate", {polynom, point})
        )
    }
}

const APIClient = new API();

const useAPI = () => APIClient;

export { useAPI, BASE_URL };
