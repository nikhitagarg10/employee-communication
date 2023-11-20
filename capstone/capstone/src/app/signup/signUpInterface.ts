export interface SignUpInterface {
    name: string,
    email: string;
    password: string;
    phone: number;
    department:empDepartment;
    role:empRole;
    status:empStatus;
}

export enum empDepartment {
    HR="HR", 
	marketing="Sales and marketing", 
	business="Business and Development", 
	testing="testing",
	development="development",
	admin="admin"
}
export enum empStatus {
    Available="Available",
	Busy="Busy", 
	DoNotDisturb="Do not Disturb",
	Offline="Offline"
}
export enum empRole {
  //marketing roles
  marketing_vice_president = "marketing vice president",
  marketing_marketing_manager = "marketing manager",
  marketing_director = "marketing director",
  marketingcoordinator = "marketing coordinator",

  //development roles
  development_developer_intern = "development intern",
  development_developer_junior = "development junior",
  development_developer_senior_software = "development senior software",
  development_developer_software = "development software",
  development_developer_vice_president = "development vice_president",

  //testing
  testing_manager = "testing manager",
  testing_quality_control = "testing quality control",
  testing_quality_assurance = "testing quality assurance",
  testing_testing_architect = "testing architect",

  //business development
  business_vice_president = "business vice president",
  business_director = "business director",
  business_manager = "business manager",
  business_consultant = "business consultant",

  //admin
  admin_lead = "admin lead",
  admin_engineer = "admin engineer",

  //HR department
  HR_director = "HR director",
  HR_coordinate = "HR coordinate",
  HR_associate = "HR associate",
  HR_manager = "HR manager",
  HR_talent_acquisition = "HR talent acquisition",
  r = "r"
}

export enum statusColor{
    Available="green",
	Busy="red", 
	DoNotDisturb="yellow",
	Offline="grey"
}
