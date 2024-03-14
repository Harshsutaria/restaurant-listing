-- Business schema
create table business (
    "businessId" varchar primary key not null,
    "businessName" varchar not null,
    "ownerId" varchar not null,
    "ownerName" varchar not null,
    "businessContactNumber" varchar not null,
    "businessCity" varchar,
    "businessAddress" varchar not null,
    "imagesPath" varchar not null,
    "createdTS" varchar not null,
    "updatedTS" varchar not null
);


-- userProfile schema

create table userAuthProfile(
    "userId" varchar primary key not null,
    "userName" varchar not null,
    "userEmail" varchar not null,
    "password" varchar not null,
    "userRole" varchar not null,
    "createdTS" varchar not null,
    "updatedTS" varchar not null
);


-- review schema
create table review(
    "reviewId" varchar primary key not null,
    "businessId" varchar not null,
    "userId" varchar not null,
    "review" varchar not null,
    "rating" varchar not null,
    "reply" varchar, 
    "createdTS" varchar not null,
    "updatedTS" varchar not null
);


