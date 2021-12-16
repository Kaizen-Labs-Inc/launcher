import type Position from './Position';

export default interface Board {
	id?: number;
	boardType: number;
	backdropId?: number;
	positions: Position[];
}
