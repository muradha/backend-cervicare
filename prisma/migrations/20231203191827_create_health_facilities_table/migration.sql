-- CreateTable
CREATE TABLE `health_facilities` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `openHour` INTEGER NOT NULL,
    `closeHour` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facility_location` (
    `id` VARCHAR(191) NOT NULL,
    `healthFacilityId` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `province` VARCHAR(100) NOT NULL,
    `city` VARCHAR(150) NULL,
    `regency` VARCHAR(160) NULL,
    `district` VARCHAR(160) NULL,
    `urbanVillage` VARCHAR(160) NULL,
    `rural` VARCHAR(160) NULL,
    `latitude` DECIMAL(8, 6) NULL,
    `longitude` DECIMAL(9, 6) NULL,

    UNIQUE INDEX `facility_location_healthFacilityId_key`(`healthFacilityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medical_facilities` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medical_collaboration` (
    `healthFacilityId` VARCHAR(191) NOT NULL,
    `medicalFacilityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `medical_collaboration_healthFacilityId_medicalFacilityId_key`(`healthFacilityId`, `medicalFacilityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `public_facilities` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facility_link` (
    `healthFacilityId` VARCHAR(191) NOT NULL,
    `publicFacilityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `facility_link_healthFacilityId_publicFacilityId_key`(`healthFacilityId`, `publicFacilityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `facility_location` ADD CONSTRAINT `facility_location_healthFacilityId_fkey` FOREIGN KEY (`healthFacilityId`) REFERENCES `health_facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_collaboration` ADD CONSTRAINT `medical_collaboration_healthFacilityId_fkey` FOREIGN KEY (`healthFacilityId`) REFERENCES `health_facilities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_collaboration` ADD CONSTRAINT `medical_collaboration_medicalFacilityId_fkey` FOREIGN KEY (`medicalFacilityId`) REFERENCES `medical_facilities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facility_link` ADD CONSTRAINT `facility_link_healthFacilityId_fkey` FOREIGN KEY (`healthFacilityId`) REFERENCES `health_facilities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facility_link` ADD CONSTRAINT `facility_link_publicFacilityId_fkey` FOREIGN KEY (`publicFacilityId`) REFERENCES `public_facilities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
