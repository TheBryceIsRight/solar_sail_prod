export interface MerchantModel {
    id: number;
    taxId: number;
    externalMid: number;
    clientGroupKey: number;
    chainName: string;
    chainKey: number;
    parentChainKey: number;
    parentChainName: string;
    dba: string;
    merchantName: string;
    midsWithSameId: number;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    sic: string;
    channel: string;
    depositingBank: string;
    pricingMethod: string;
    pricingProgramName: string;
    pricingProgramNumber: number;
    tenure: string;
    LDD: string;
    yearVolume: number;
    yearTransactionCount: number;
    monthlyVolume: number;
    monthlyTransactionCount: number;
    monthlyDowngradeVolume: number;
    monthlyDowngradeCount: number;
    routingNumber: number;
    accountNumber: number;
    socialSecurityNumber: number;
  }