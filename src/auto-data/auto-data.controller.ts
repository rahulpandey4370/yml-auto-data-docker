import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validateVin } from 'src/util/validators';
import { AutoDataService } from './auto-data.service';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { IVehicleDetailsByVinResponse } from 'src/dto/vehicle-detail-by-vin.dto';
import { VehicleInfoDBInfo } from 'src/dto/vehicle-info-db.dto';

@Controller('vehicle-info')
@ApiTags('Vehicles')
export class AutoDataController {
  constructor(private autodataService: AutoDataService) {}

  @Get(':vin/vin-details')
  @ApiOperation({ summary: 'Fetch Vehicle details using Vehicle Identification Number (VIN)' })
  @ApiOkResponse({ 
    description: `Valid VIN received`,
    type: IVehicleDetailsByVinResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid response payload/ Invalid VIN',
    schema: {
      type: 'object',
      example: {
        statusCode: 400,
        message: "Vin Not Found / Invalid Vin",
        timestamp: "2023-02-07T05:06:07.598Z",
        path: "/vehicle-info/JN1BF0AAXPM403244/vin-details"
      }
    }
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Internal Server Error',
    schema: {
      type: 'object',
      example: {
        statusCode: 500,
        message: "Internal Server Error",
        timestamp: "2023-02-07T05:06:07.598Z",
        path: "/vehicle-info/JN1BF0AAXPM403244/vin-details"
      }
    }
   })
  @ApiExtraModels(IVehicleDetailsByVinResponse)
  @ApiExtraModels(VehicleInfoDBInfo)
  async getVehicleDetailsByVin(@Param('vin') vin: string) {
    const valid = validateVin(vin);
    if (valid) {
      return await this.autodataService.getVehicleDetailsByVin(vin);
    }
    throw new HttpException('Invalid Vin', HttpStatus.BAD_REQUEST);
  }

  @Get(':vin/report')
  @ApiOperation({ summary: 'Generate a PDF Report having Vehicle details using Vehicle Identification Number (VIN)' })
  @ApiOkResponse({ 
    description: "PDF Report generated successfully",
    content : {
      "application/pdf": {
        schema: {
          type: "application/pdf",
          format: 'binary',
          example: {
            message: "Pdf Report generated"
          }
        },
      }
    } 
  })
  @ApiBadRequestResponse({
    description: 'Invalid response payload/ Invalid VIN',
    schema: {
      type: 'object',
      example: {
        statusCode: 400,
        message: "Vin Not Found / Invalid Vin",
        timestamp: "2023-02-07T05:06:07.598Z",
        path: "/vehicle-info/JN1BF0AAXPM403244/report"
      }
    }
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Internal Server Error',
    schema: {
      type: 'object',
      example: {
        statusCode: 500,
        message: "Internal Server Error",
        timestamp: "2023-02-07T05:06:07.598Z",
        path: "/vehicle-info/JN1BF0AAXPM403244/report"
      }
    }
   })
  async getVehicleDetailsReportByVin(@Param('vin') vin: string) {
    const valid = validateVin(vin);
    if (valid) {
      return await this.autodataService.generateReport(vin);
    }
    throw new HttpException('Invalid Vin', HttpStatus.BAD_REQUEST);
  }
}
