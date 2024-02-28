-- Product schema
create table product (
    "productId" varchar primary key not null,
    "productTitle" varchar not null,
    "productCategory" varchar not null,
    "productDescription" varchar,
    "mrp" varchar not null,
    "sellingPrice" varchar not null,
    "manufacturer" varchar not null,
    "quantity" varchar not null,
    "units" varchar not null,
    "shelfLife" varchar,
    "createdTS" varchar not null,
    "updatedTS" varchar not null
);


-- userProfile schema

create table userProfile(
    "userId" varchar primary key not null,
    "userName" varchar not null,
    "userRole" varchar not null,
    "createdTS" varchar not null,
    "updatedTS" varchar not null
);


-- orders schema
create table orders(
    "orderId" varchar primary key not null,
    "customerId" varchar not null,
    "deliveryAddress" varchar not null,
    "orderValue" varchar not null,
    "productList" JSONB not null,
    "orderStatus" varchar not null,
    "paymentMethod" varchar not null,
    "createdTS" varchar not null,
    "updatedTS" varchar not null
);


