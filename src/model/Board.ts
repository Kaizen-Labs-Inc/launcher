import type { Backdrop } from '@prisma/client';
import type Position from './Position';

export default interface Board {
	id?: number;
	boardType: number;
	backdrop?: Backdrop;
	backdropId?: number;
	positions: Position[];
}
