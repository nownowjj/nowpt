interface LoginResponse {
    accessToken?: string;
    tokenType?: string;
    role?: string | null;
    errorMessage?: string;
}