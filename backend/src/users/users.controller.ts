import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return this.usersService.findById(user.id);
  }

  @Put('profile')
  async updateProfile(@CurrentUser() user: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Get('addresses')
  async getAddresses(@CurrentUser() user: any) {
    return this.usersService.getAddresses(user.id);
  }

  @Post('addresses')
  async createAddress(@CurrentUser() user: any, @Body() createAddressDto: CreateAddressDto) {
    return this.usersService.createAddress(user.id, createAddressDto);
  }

  @Put('addresses/:id')
  async updateAddress(
    @CurrentUser() user: any,
    @Param('id') addressId: string,
    @Body() updateAddressDto: CreateAddressDto,
  ) {
    return this.usersService.updateAddress(user.id, addressId, updateAddressDto);
  }

  @Delete('addresses/:id')
  async deleteAddress(@CurrentUser() user: any, @Param('id') addressId: string) {
    return this.usersService.deleteAddress(user.id, addressId);
  }
}

