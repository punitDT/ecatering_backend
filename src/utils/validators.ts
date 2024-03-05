

export const checkNull = (field: string, value: any) => {
    if (value === null || value === '') {
      throw new Error(`${field} cannot be null or an empty string`);
    }
  };