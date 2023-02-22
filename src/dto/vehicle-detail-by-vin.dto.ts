import { ApiProperty } from '@nestjs/swagger';

export class IVehicleDetailsByVinResponse {
  @ApiProperty({
    description: 'Vehicle Identification Number',
    example: 'JN1BF0AAXPM403245',
  })
  readonly vin: string;

  @ApiProperty({
    description: 'Year of vehicle registration',
    example: '2022',
  })
  readonly year?: number;

  @ApiProperty({
    description: 'Company that made the vehicle',
    example: 'Audi',
  })
  readonly make: string;

  @ApiProperty({
    description: 'Model number of the vehicle ',
    example: 'Q5',
  })
  readonly model: string;

  @ApiProperty({
    description: 'A particular version of a model with a particular set of configuration',
    example: 'Prestige 55 TFSI e S line quattro S tronic',
  })
  readonly trim: string;

  @ApiProperty({
    description: 'Color of the vehicle',
    example: 'Silver',
  })
  readonly color: string;

  @ApiProperty({
    description: 'Color of the vehicle in terms of exact hex value',
    example: 'ADAAAA',
  })
  colorHex: string;

  @ApiProperty({
    description: 'A primary key to identify the vehicle',
    example: '430733',
  })
  styleId: string;
}
