import { CreateCharacteristicDto } from "./create-characteristic.dto";

export interface UpdateCharacteristicDto
  extends Partial<CreateCharacteristicDto> {
  id: number;
}
