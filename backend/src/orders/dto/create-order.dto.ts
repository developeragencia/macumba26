import { IsArray, IsNumber, IsObject, IsOptional, IsString, Min } from 'class-validator';

class OrderItemDto {
  @IsString()
  productId: string;

  @IsString()
  vendorId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @IsArray()
  items: OrderItemDto[];

  @IsString()
  paymentMethod: string;

  @IsObject()
  shippingAddress: any;

  @IsNumber()
  @Min(0)
  shippingCost: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  tax?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

