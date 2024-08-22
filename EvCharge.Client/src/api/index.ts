export type ApiResult<T = undefined> =
	| (T extends undefined
			? { ok: true }
			: {
					ok: true;
					payload: T;
			  })
	| {
			ok: false;
			error: string;
	  };
