

export interface Comments {
    UserName: string,
    _id: string,
    Title: string,
    Body: string,
    PostDate: number,
    UserId: string,
    EventImage: Array<string>,
    ProfileImage: string,
    QuestionId: string,
    isBlocked: boolean,
    Votes: number
}

export interface resComment{ 
    EventImage: Array<string>,
    Title: string,
    Body: string,
    UserId: string
}


export interface Questions{
   
    _id: string,
    Title: string,
    Body: string,
    Tags: Array<string>,
    PostDate: Date,
    EditDate: Date,
    Categoryid: string,
    UserId: string,
    isBlocked: boolean,
    EventImage: Array<string>,
    Comments: Array<Comment>,
    Votes: number
}

export interface resQuestion{
    Title: string,
    Body: string,
    Tags: Array<string>,
    Categoryid: string,
    UserId: string,
    EventImage: Array<string>,
}

export interface Categories {
    _id: string,
    Name: string
}
export interface Role {
    _id: string,
    RoleName: string,
    DeleteComments: boolean,
}

export interface Users {
    _id: string,
    UserName: string,
    Password: string,
    Email: string,
    Description: string,
    RegistrationDate: Date,
    UserRole: string,
    isBlocked: boolean,
    ProfileImage: string
    Role: string

}

export interface UserProfile{
    ProfileImage: string,
    UserName: string,
    Role: string,
    Email: string
    Description: string,
    RegistrationDate: number
}

export interface Post {
    UserName: string,
    UserId: string,
    ProfileImage: string,
    Category: string,
    Title: string,
    Body: string,
    Tags: Array<string>,
    PostDate: number,
    isBlocked: boolean,
    NumberOfComments: number,
    QuestionId: string,
    CategoryId: string,
    Votes: number
}