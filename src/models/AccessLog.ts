interface AuthInfo {
    namespace: string;
    principal: string;
    requestPrincipal: string;
    user: string;
}

interface Resource {
    address: {
        ip: string;
        port: number;
    };

    metadata: any;
    name: string;
    namespace: string;
    workload: string;
}

interface Request {
    authority: string;
    headers: { [key: string]: string; };
    metadata: any;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
    originalPath: string;
    path: string;
    referer: string;
    scheme: string;
    userAgent: string;
}

interface Response {
    bodyBytes: number;
    flags: string[];
    headers: { [key: string]: string; };
    metadata: any;
    statusCode: number;
}

export interface AccessLog {
    authInfo: AuthInfo;
    destination: Resource;
    direction: 'inbound' | 'outbound';
    latency: string;
    protocolVersion: string;
    request: Request;
    response: Response;
    source: Resource;
}
