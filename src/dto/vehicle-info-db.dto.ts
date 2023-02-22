import { ApiProperty } from '@nestjs/swagger';
export class VehicleInfoDBInfo {

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
    description: 'Year of vehicle registration',
    example: '2022',
  })
  readonly year: string;

  @ApiProperty({
    description: 'Exterior color of the vehicle ',
    example: 'Blue',
  })
  readonly exteriorColors: string;

  @ApiProperty({
    description: 'Details of vehicle'
  })
  readonly vehicle: string;

  @ApiProperty({
    description: 'Details of vehicle'
  })
  readonly vehicles: string;

  @ApiProperty({
    description: 'A primary key to identify the vehicle',
    example: '430733',
  })
  styleId: string;
}
