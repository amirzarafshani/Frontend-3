export interface IAxiosProjectResponse {
    code: string;
    data: IProjectProps[];
    error: string;
}

export interface IAxiosGatewayResponse {
    code: string;
    data: IGatewayProps[];
    error: string;
}

export interface IAxiosReportsResponse {
    code: string;
    data: IReportProps[];
    error: string;
}

export interface IReportProps {
    paymentId: string;
    amount: number;
    projectId: string;
    gatewayId: string;
    userIds: string[];
    modified: string;
    created: string;
}

export interface IGroupedReportsResponse {
    id: string;
    items: IGroupedReportItemProps[];
    total: number;
    name: string;
}

export interface IGroupedReportItemProps {
    paymentId: string;
    amount: number;
    id: string;
    created: string;
    gateway?: string;
}

export interface IProjectProps {
    projectId: string;
    name: string;
}

export interface IGatewayProps {
    gatewayId: string;
    name: string;
}

export interface IFilterPostDto {
    projectId: string;
    gatewayId: string;
    from: string;
    to: string;
}