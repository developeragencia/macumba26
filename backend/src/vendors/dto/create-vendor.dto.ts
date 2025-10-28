import { IsString, IsOptional, MinLength, Matches } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  @MinLength(3)
  storeName: string;

  @IsString()
  @MinLength(3)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Store slug must contain only lowercase letters, numbers, and hyphens',
  })
  storeSlug: string;

  @IsOptional()
  @IsString()
  storeDescription?: string;

  @IsOptional()
  @IsString()
  storeLogo?: string;

  @IsOptional()
  @IsString()
  storeBanner?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{14}$/, { message: 'CNPJ must be 14 digits' })
  cnpj?: string;
}

