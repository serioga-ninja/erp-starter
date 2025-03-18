-- CreateTable
CREATE TABLE "Files" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "path" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntityHistory" (
    "entityId" UUID NOT NULL,
    "state" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Auth" (
    "userId" TEXT NOT NULL,
    "provider" VARCHAR NOT NULL,
    "refreshToken" VARCHAR NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Resources" (
    "id" UUID NOT NULL,
    "parentId" UUID,
    "displayName" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "permissions" JSONB NOT NULL DEFAULT '[]',
    "name" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourcesRolePermissions" (
    "roleId" TEXT NOT NULL,
    "moduleId" UUID NOT NULL,
    "permissions" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "ResourcesRolePermissions_pkey" PRIMARY KEY ("roleId","moduleId")
);

-- CreateTable
CREATE TABLE "ResourcesUserPermissions" (
    "userId" UUID NOT NULL,
    "moduleId" UUID NOT NULL,
    "permissions" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "ResourcesUserPermissions_pkey" PRIMARY KEY ("userId","moduleId")
);

-- CreateTable
CREATE TABLE "Roles" (
    "role" TEXT NOT NULL,
    "displayName" VARCHAR NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("role")
);

-- CreateTable
CREATE TABLE "UserRoles" (
    "userId" UUID NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "email" VARCHAR NOT NULL,
    "personalEmail" VARCHAR NOT NULL DEFAULT '',
    "phone" VARCHAR NOT NULL DEFAULT '',
    "onboardingRequired" BOOLEAN NOT NULL DEFAULT false,
    "firstName" VARCHAR NOT NULL DEFAULT '',
    "lastName" VARCHAR NOT NULL DEFAULT '',
    "name" VARCHAR NOT NULL,
    "dob" DATE NOT NULL,
    "gender" VARCHAR NOT NULL,
    "entityStatus" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageId" UUID,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityModeuls" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecurityModeuls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "entityId_createdAt_index" ON "EntityHistory"("entityId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "EntityHistory_entityId_createdAt_key" ON "EntityHistory"("entityId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Resources_name_key" ON "Resources"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_imageId_key" ON "Users"("imageId");

-- AddForeignKey
ALTER TABLE "Resources" ADD CONSTRAINT "Resources_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Resources"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesRolePermissions" ADD CONSTRAINT "ResourcesRolePermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesRolePermissions" ADD CONSTRAINT "ResourcesRolePermissions_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesUserPermissions" ADD CONSTRAINT "ResourcesUserPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesUserPermissions" ADD CONSTRAINT "ResourcesUserPermissions_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
