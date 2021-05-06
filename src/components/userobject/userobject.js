class userDTO{
tz
firstName
lastName
tel
email
permissionCode
password

constructor(tz =null,firstName =null,lastName=null,tel=null,email=null,permissionCode=null,password=null)
{
this.tz=tz;
this.firstName=firstName;
this.lastName=lastName;
this.tel=tel;
this.email=email;
this.permissionCode=permissionCode;
this.password=password;
}

}
export default userDTO;