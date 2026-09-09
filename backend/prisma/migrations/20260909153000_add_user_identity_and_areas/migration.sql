ALTER TABLE "User" ADD COLUMN "documentId" TEXT;
ALTER TABLE "User" ADD COLUMN "areaId" TEXT;

CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "dependencyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_documentId_key" ON "User"("documentId");
CREATE UNIQUE INDEX "Area_code_key" ON "Area"("code");
CREATE UNIQUE INDEX "Area_name_dependencyId_key" ON "Area"("name", "dependencyId");

ALTER TABLE "User" ADD CONSTRAINT "User_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Area" ADD CONSTRAINT "Area_dependencyId_fkey" FOREIGN KEY ("dependencyId") REFERENCES "Dependency"("id") ON DELETE SET NULL ON UPDATE CASCADE;