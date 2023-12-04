-- DropForeignKey
ALTER TABLE `facility_location` DROP FOREIGN KEY `facility_location_healthFacilityId_fkey`;

-- AlterTable
ALTER TABLE `health_facilities` ADD COLUMN `photo` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `facility_location` ADD CONSTRAINT `facility_location_healthFacilityId_fkey` FOREIGN KEY (`healthFacilityId`) REFERENCES `health_facilities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
