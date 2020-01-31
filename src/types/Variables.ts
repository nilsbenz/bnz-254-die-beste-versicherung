export interface RecordDamageVariables {
  variables: {
    firstname: Variable<string>;
    lastname: Variable<string>;
    address: Variable<string>;
    city: Variable<String>;
    email: Variable<String>;
    message: Variable<string>;
    amount: Variable<number>;
    insurance: Variable<"bronze" | "silver" | "gold" | null>;
  };
}

export interface CheckDamageVariables {
  variables: {
    granted: Variable<boolean>;
  };
}

export interface TaskVariables {
  firstname?: TaskVariable<string>;
  lastname?: TaskVariable<string>;
  address?: TaskVariable<string>;
  city?: TaskVariable<String>;
  email?: TaskVariable<String>;
  message?: TaskVariable<string>;
  amount?: TaskVariable<number>;
  insurance?: TaskVariable<"bronze" | "silver" | "gold" | null>;
  payedAmount?: TaskVariable<number>;
}

interface Variable<T> {
  value: T;
}

interface TaskVariable<T> {
  type: string;
  value: T;
}
