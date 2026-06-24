import React, { useEffect, useMemo, useState } from "react";

const CATEGORIES = ["All", "Catering", "Desserts"];

const IMAGES = [
  { src: "/images/catering/2023-catering-table-1.webp", alt: "Daily Spread 2023 Catering Table 1", category: "Catering" },
  { src: "/images/catering/2023-catering-table.webp", alt: "Daily Spread 2023 Catering Table", category: "Catering" },
  { src: "/images/catering/2023-ccp-catering-1.webp", alt: "Daily Spread 2023 Ccp Catering 1", category: "Catering" },
  { src: "/images/catering/2023-ccp-catering-2.webp", alt: "Daily Spread 2023 Ccp Catering 2", category: "Catering" },
  { src: "/images/catering/2023-ccp-catering-3.webp", alt: "Daily Spread 2023 Ccp Catering 3", category: "Catering" },
  { src: "/images/catering/2023-ccp-catering-5.webp", alt: "Daily Spread 2023 Ccp Catering 5", category: "Catering" },
  { src: "/images/catering/2023-larw-hh-1.webp", alt: "Daily Spread 2023 Larw Hh 1", category: "Catering" },
  { src: "/images/catering/2023-larw-hh-2.webp", alt: "Daily Spread 2023 Larw Hh 2", category: "Catering" },
  { src: "/images/catering/2023-larw-hh-4.webp", alt: "Daily Spread 2023 Larw Hh 4", category: "Catering" },
  { src: "/images/catering/2023-larw-hh.webp", alt: "Daily Spread 2023 Larw Hh", category: "Catering" },
  { src: "/images/catering/65725751137-9bc1ff50-473e-4fd1-bcdd-68c604a604ff-fullsizerender.webp", alt: "Daily Spread 65725751137 9Bc1Ff50 473E 4Fd1 Bcdd 68C604A604Ff Fullsizerender", category: "Catering" },
  { src: "/images/catering/65940178022-c8ad50b5-034a-4de9-8e50-45b0f72312dd-fullsizerender.webp", alt: "Daily Spread 65940178022 C8Ad50B5 034A 4De9 8E50 45B0F72312Dd Fullsizerender", category: "Catering" },
  { src: "/images/catering/66093103933-a63b26a7-b56a-4f4f-acc2-9b09d5a8e7eb-fullsizerender.webp", alt: "Daily Spread 66093103933 A63B26A7 B56A 4F4F Acc2 9B09D5A8E7Eb Fullsizerender", category: "Catering" },
  { src: "/images/catering/66093105179-f67af27c-6bfe-451e-a9b3-9a2b07d2c2e4-fullsizerender.webp", alt: "Daily Spread 66093105179 F67Af27C 6Bfe 451E A9B3 9A2B07D2C2E4 Fullsizerender", category: "Catering" },
  { src: "/images/catering/66178775755-9bac5eed-433b-44e9-be06-ca444ad21565.webp", alt: "Daily Spread 66178775755 9Bac5Eed 433B 44E9 Be06 Ca444Ad21565", category: "Catering" },
  { src: "/images/catering/66178776783-237a5861-3f1f-4ed2-84fe-877e35071ba1-fullsizerender.webp", alt: "Daily Spread 66178776783 237A5861 3F1F 4Ed2 84Fe 877E35071Ba1 Fullsizerender", category: "Catering" },
  { src: "/images/catering/66874231596-353462e6-688e-4758-8913-e6f7364a14e4-fullsizerender.webp", alt: "Daily Spread 66874231596 353462E6 688E 4758 8913 E6F7364A14E4 Fullsizerender", category: "Catering" },
  { src: "/images/catering/67543992341-86fad96c-9f79-472b-8669-09bfb9ae518d-fullsizerender.webp", alt: "Daily Spread 67543992341 86Fad96C 9F79 472B 8669 09Bfb9Ae518D Fullsizerender", category: "Catering" },
  { src: "/images/catering/67962766849-be320040-75ea-40b0-898c-35c418b92564.webp", alt: "Daily Spread 67962766849 Be320040 75Ea 40B0 898C 35C418B92564", category: "Catering" },
  { src: "/images/catering/70527673461-9d7a1683-a2c8-4569-8d95-9c25cb03ab53-fullsizerender.webp", alt: "Daily Spread 70527673461 9D7A1683 A2C8 4569 8D95 9C25Cb03Ab53 Fullsizerender", category: "Catering" },
  { src: "/images/catering/70743153701-0e3c4855-e650-4daa-a01f-42b139e71215-fullsizerender.webp", alt: "Daily Spread 70743153701 0E3C4855 E650 4Daa A01F 42B139E71215 Fullsizerender", category: "Catering" },
  { src: "/images/catering/70743360134-bc1c5838-6698-4958-8f0a-5721fe677a2f.webp", alt: "Daily Spread 70743360134 Bc1C5838 6698 4958 8F0A 5721Fe677A2F", category: "Catering" },
  { src: "/images/catering/70743361377-dcd35667-f5f1-4786-b045-366875a24027-fullsizerender.webp", alt: "Daily Spread 70743361377 Dcd35667 F5F1 4786 B045 366875A24027 Fullsizerender", category: "Catering" },
  { src: "/images/catering/71010262429-79505ff8-6ee5-45dc-84a1-e57faeb70f19-fullsizerender.webp", alt: "Daily Spread 71010262429 79505Ff8 6Ee5 45Dc 84A1 E57Faeb70F19 Fullsizerender", category: "Catering" },
  { src: "/images/catering/71011125858-60e83d5c-ece6-42d6-859e-fbdf999f605b-fullsizerender.webp", alt: "Daily Spread 71011125858 60E83D5C Ece6 42D6 859E Fbdf999F605B Fullsizerender", category: "Catering" },
  { src: "/images/catering/71011126898-5acf1f6a-0d86-48bb-80ee-5754e7e7687d-fullsizerender.webp", alt: "Daily Spread 71011126898 5Acf1F6A 0D86 48Bb 80Ee 5754E7E7687D Fullsizerender", category: "Catering" },
  { src: "/images/catering/71011127919-29b742a7-aa4a-4163-9879-fbf0db61cd5d.webp", alt: "Daily Spread 71011127919 29B742A7 Aa4A 4163 9879 Fbf0Db61Cd5D", category: "Catering" },
  { src: "/images/catering/71011129052-5fa2db65-002e-4c50-b397-d1a831d30356.webp", alt: "Daily Spread 71011129052 5Fa2Db65 002E 4C50 B397 D1A831D30356", category: "Catering" },
  { src: "/images/catering/71011133596-68ed835b-9820-4f59-abca-b19d9f451e98-fullsizerender.webp", alt: "Daily Spread 71011133596 68Ed835B 9820 4F59 Abca B19D9F451E98 Fullsizerender", category: "Catering" },
  { src: "/images/catering/71899637919-32ba7ece-8cc8-4c6b-a0f6-0bcddd7a1a09.webp", alt: "Daily Spread 71899637919 32Ba7Ece 8Cc8 4C6B A0F6 0Bcddd7A1A09", category: "Catering" },
  { src: "/images/catering/71899638685-e7483805-1414-466d-8b35-52596a3f6d86.webp", alt: "Daily Spread 71899638685 E7483805 1414 466D 8B35 52596A3F6D86", category: "Catering" },
  { src: "/images/catering/72040998854-c511281b-faa0-4d12-8ea1-27adc567604c.webp", alt: "Daily Spread 72040998854 C511281B Faa0 4D12 8Ea1 27Adc567604C", category: "Catering" },
  { src: "/images/catering/agualito-soup.webp", alt: "Daily Spread Agualito Soup", category: "Catering" },
  { src: "/images/catering/antipasato-wedding-appetizers.webp", alt: "Daily Spread Antipasato Wedding Appetizers", category: "Catering" },
  { src: "/images/catering/antipasto-wedding-appetizer-1.webp", alt: "Daily Spread Antipasto Wedding Appetizer 1", category: "Catering" },
  { src: "/images/catering/bacon-wrapped-shrimp-with-maple-drizzle.webp", alt: "Daily Spread Bacon Wrapped Shrimp With Maple Drizzle", category: "Catering" },
  { src: "/images/catering/basted-red-snapper-over-arborio-rice-medley.webp", alt: "Daily Spread Basted Red Snapper Over Arborio Rice Medley", category: "Catering" },
  { src: "/images/catering/breakfast-caatered-4.webp", alt: "Daily Spread Breakfast Caatered 4", category: "Catering" },
  { src: "/images/catering/breakfast-catered-1.webp", alt: "Daily Spread Breakfast Catered 1", category: "Catering" },
  { src: "/images/catering/breakfast-catered-2.webp", alt: "Daily Spread Breakfast Catered 2", category: "Catering" },
  { src: "/images/catering/breakfast-catered-3.webp", alt: "Daily Spread Breakfast Catered 3", category: "Catering" },
  { src: "/images/catering/breakfast-catered-4.webp", alt: "Daily Spread Breakfast Catered 4", category: "Catering" },
  { src: "/images/catering/breakfast-catered-5.webp", alt: "Daily Spread Breakfast Catered 5", category: "Catering" },
  { src: "/images/catering/breakfast-catered-6.webp", alt: "Daily Spread Breakfast Catered 6", category: "Catering" },
  { src: "/images/catering/business-grand-opening-catering-1.webp", alt: "Daily Spread Business Grand Opening Catering 1", category: "Catering" },
  { src: "/images/catering/business-grand-opening-catering-2.webp", alt: "Daily Spread Business Grand Opening Catering 2", category: "Catering" },
  { src: "/images/catering/business-grand-opening-catering.webp", alt: "Daily Spread Business Grand Opening Catering", category: "Catering" },
  { src: "/images/catering/caprese-skewers.webp", alt: "Daily Spread Caprese Skewers", category: "Catering" },
  { src: "/images/catering/catering-set-up-1.webp", alt: "Daily Spread Catering Set Up 1", category: "Catering" },
  { src: "/images/catering/catering-set-up-2.webp", alt: "Daily Spread Catering Set Up 2", category: "Catering" },
  { src: "/images/catering/catering-set-up.webp", alt: "Daily Spread Catering Set Up", category: "Catering" },
  { src: "/images/catering/catering-table.webp", alt: "Daily Spread Catering Table", category: "Catering" },
  { src: "/images/catering/charcuterie-catering-1.webp", alt: "Daily Spread Charcuterie Catering 1", category: "Catering" },
  { src: "/images/catering/charcuterie-catering-2.webp", alt: "Daily Spread Charcuterie Catering 2", category: "Catering" },
  { src: "/images/catering/charcuterie-catering.webp", alt: "Daily Spread Charcuterie Catering", category: "Catering" },
  { src: "/images/catering/charcuterie-grazing-table-1.webp", alt: "Daily Spread Charcuterie Grazing Table 1", category: "Catering" },
  { src: "/images/catering/charcuterie-grazing-table-2.webp", alt: "Daily Spread Charcuterie Grazing Table 2", category: "Catering" },
  { src: "/images/catering/charcuterie-grazing-table-3.webp", alt: "Daily Spread Charcuterie Grazing Table 3", category: "Catering" },
  { src: "/images/catering/charcuterie-grazing-table.webp", alt: "Daily Spread Charcuterie Grazing Table", category: "Catering" },
  { src: "/images/catering/charcuterie-table-6ft-x-15-inches-2.webp", alt: "Daily Spread Charcuterie Table 6Ft X 15 Inches 2", category: "Catering" },
  { src: "/images/catering/charcuterie-table-6ft-x-15-inches-3.webp", alt: "Daily Spread Charcuterie Table 6Ft X 15 Inches 3", category: "Catering" },
  { src: "/images/catering/charcuterie-table-6ft-x-15-inches.webp", alt: "Daily Spread Charcuterie Table 6Ft X 15 Inches", category: "Catering" },
  { src: "/images/catering/charcuterie-table.webp", alt: "Daily Spread Charcuterie Table", category: "Catering" },
  { src: "/images/catering/charcuterie-tables-6ft-x-15-inches-3.webp", alt: "Daily Spread Charcuterie Tables 6Ft X 15 Inches 3", category: "Catering" },
  { src: "/images/catering/chartuterie-table.webp", alt: "Daily Spread Chartuterie Table", category: "Catering" },
  { src: "/images/catering/chicken-ench-verde.webp", alt: "Daily Spread Chicken Ench Verde", category: "Catering" },
  { src: "/images/catering/chicken-roulade-1.webp", alt: "Daily Spread Chicken Roulade 1", category: "Catering" },
  { src: "/images/catering/cucumber-shrimp-tzatziki-rounds.webp", alt: "Daily Spread Cucumber Shrimp Tzatziki Rounds", category: "Catering" },
  { src: "/images/catering/empanadas-1.webp", alt: "Daily Spread Empanadas 1", category: "Catering" },
  { src: "/images/catering/fish-taco.webp", alt: "Daily Spread Fish Taco", category: "Catering" },
  { src: "/images/catering/fruit-tray-m.webp", alt: "Daily Spread Fruit Tray M", category: "Catering" },
  { src: "/images/catering/fruit-tray-s.webp", alt: "Daily Spread Fruit Tray S", category: "Catering" },
  { src: "/images/catering/german-asian-meal.webp", alt: "Daily Spread German Asian Meal", category: "Catering" },
  { src: "/images/catering/grazing-table.webp", alt: "Daily Spread Grazing Table", category: "Catering" },
  { src: "/images/catering/img-1496.webp", alt: "Daily Spread Img 1496", category: "Catering" },
  { src: "/images/catering/img-1497.webp", alt: "Daily Spread Img 1497", category: "Catering" },
  { src: "/images/catering/img-1498.webp", alt: "Daily Spread Img 1498", category: "Catering" },
  { src: "/images/catering/img-1499.webp", alt: "Daily Spread Img 1499", category: "Catering" },
  { src: "/images/catering/img-1503.webp", alt: "Daily Spread Img 1503", category: "Catering" },
  { src: "/images/catering/img-1505.webp", alt: "Daily Spread Img 1505", category: "Catering" },
  { src: "/images/catering/img-1801.webp", alt: "Daily Spread Img 1801", category: "Catering" },
  { src: "/images/catering/img-1802.webp", alt: "Daily Spread Img 1802", category: "Catering" },
  { src: "/images/catering/img-1803.webp", alt: "Daily Spread Img 1803", category: "Catering" },
  { src: "/images/catering/img-1804.webp", alt: "Daily Spread Img 1804", category: "Catering" },
  { src: "/images/catering/img-3276.webp", alt: "Daily Spread Img 3276", category: "Catering" },
  { src: "/images/catering/img-3277.webp", alt: "Daily Spread Img 3277", category: "Catering" },
  { src: "/images/catering/img-3278.webp", alt: "Daily Spread Img 3278", category: "Catering" },
  { src: "/images/catering/img-3370.webp", alt: "Daily Spread Img 3370", category: "Catering" },
  { src: "/images/catering/img-3394.webp", alt: "Daily Spread Img 3394", category: "Catering" },
  { src: "/images/catering/img-3557.webp", alt: "Daily Spread Img 3557", category: "Catering" },
  { src: "/images/catering/img-3720.webp", alt: "Daily Spread Img 3720", category: "Catering" },
  { src: "/images/catering/img-3733.webp", alt: "Daily Spread Img 3733", category: "Catering" },
  { src: "/images/catering/img-3734.webp", alt: "Daily Spread Img 3734", category: "Catering" },
  { src: "/images/catering/img-3782.webp", alt: "Daily Spread Img 3782", category: "Catering" },
  { src: "/images/catering/img-3783.webp", alt: "Daily Spread Img 3783", category: "Catering" },
  { src: "/images/catering/img-3789.webp", alt: "Daily Spread Img 3789", category: "Catering" },
  { src: "/images/catering/img-3802.webp", alt: "Daily Spread Img 3802", category: "Catering" },
  { src: "/images/catering/img-3821.webp", alt: "Daily Spread Img 3821", category: "Catering" },
  { src: "/images/catering/img-3822.webp", alt: "Daily Spread Img 3822", category: "Catering" },
  { src: "/images/catering/img-3824.webp", alt: "Daily Spread Img 3824", category: "Catering" },
  { src: "/images/catering/img-3825.webp", alt: "Daily Spread Img 3825", category: "Catering" },
  { src: "/images/catering/img-3826.webp", alt: "Daily Spread Img 3826", category: "Catering" },
  { src: "/images/catering/img-3827.webp", alt: "Daily Spread Img 3827", category: "Catering" },
  { src: "/images/catering/img-3921.webp", alt: "Daily Spread Img 3921", category: "Catering" },
  { src: "/images/catering/img-3972.webp", alt: "Daily Spread Img 3972", category: "Catering" },
  { src: "/images/catering/img-3973.webp", alt: "Daily Spread Img 3973", category: "Catering" },
  { src: "/images/catering/img-3974.webp", alt: "Daily Spread Img 3974", category: "Catering" },
  { src: "/images/catering/img-3975.webp", alt: "Daily Spread Img 3975", category: "Catering" },
  { src: "/images/catering/img-3976.webp", alt: "Daily Spread Img 3976", category: "Catering" },
  { src: "/images/catering/img-3977.webp", alt: "Daily Spread Img 3977", category: "Catering" },
  { src: "/images/catering/img-3991.webp", alt: "Daily Spread Img 3991", category: "Catering" },
  { src: "/images/catering/img-3993.webp", alt: "Daily Spread Img 3993", category: "Catering" },
  { src: "/images/catering/img-3994.webp", alt: "Daily Spread Img 3994", category: "Catering" },
  { src: "/images/catering/img-4006.webp", alt: "Daily Spread Img 4006", category: "Catering" },
  { src: "/images/catering/img-4044.webp", alt: "Daily Spread Img 4044", category: "Catering" },
  { src: "/images/catering/img-4045.webp", alt: "Daily Spread Img 4045", category: "Catering" },
  { src: "/images/catering/img-4046.webp", alt: "Daily Spread Img 4046", category: "Catering" },
  { src: "/images/catering/img-4047.webp", alt: "Daily Spread Img 4047", category: "Catering" },
  { src: "/images/catering/img-4167.webp", alt: "Daily Spread Img 4167", category: "Catering" },
  { src: "/images/catering/img-4168.webp", alt: "Daily Spread Img 4168", category: "Catering" },
  { src: "/images/catering/img-4169.webp", alt: "Daily Spread Img 4169", category: "Catering" },
  { src: "/images/catering/img-4170.webp", alt: "Daily Spread Img 4170", category: "Catering" },
  { src: "/images/catering/img-4176.webp", alt: "Daily Spread Img 4176", category: "Catering" },
  { src: "/images/catering/img-4177.webp", alt: "Daily Spread Img 4177", category: "Catering" },
  { src: "/images/catering/img-4178.webp", alt: "Daily Spread Img 4178", category: "Catering" },
  { src: "/images/catering/img-4242.webp", alt: "Daily Spread Img 4242", category: "Catering" },
  { src: "/images/catering/img-4243.webp", alt: "Daily Spread Img 4243", category: "Catering" },
  { src: "/images/catering/img-4244.webp", alt: "Daily Spread Img 4244", category: "Catering" },
  { src: "/images/catering/img-4245.webp", alt: "Daily Spread Img 4245", category: "Catering" },
  { src: "/images/catering/img-4321.webp", alt: "Daily Spread Img 4321", category: "Catering" },
  { src: "/images/catering/img-4322.webp", alt: "Daily Spread Img 4322", category: "Catering" },
  { src: "/images/catering/img-4323.webp", alt: "Daily Spread Img 4323", category: "Catering" },
  { src: "/images/catering/img-4324.webp", alt: "Daily Spread Img 4324", category: "Catering" },
  { src: "/images/catering/img-4325.webp", alt: "Daily Spread Img 4325", category: "Catering" },
  { src: "/images/catering/img-4353.webp", alt: "Daily Spread Img 4353", category: "Catering" },
  { src: "/images/catering/img-4354.webp", alt: "Daily Spread Img 4354", category: "Catering" },
  { src: "/images/catering/img-4355.webp", alt: "Daily Spread Img 4355", category: "Catering" },
  { src: "/images/catering/img-4356.webp", alt: "Daily Spread Img 4356", category: "Catering" },
  { src: "/images/catering/img-4358.webp", alt: "Daily Spread Img 4358", category: "Catering" },
  { src: "/images/catering/img-4359.webp", alt: "Daily Spread Img 4359", category: "Catering" },
  { src: "/images/catering/img-4361.webp", alt: "Daily Spread Img 4361", category: "Catering" },
  { src: "/images/catering/img-4362.webp", alt: "Daily Spread Img 4362", category: "Catering" },
  { src: "/images/catering/img-4388.webp", alt: "Daily Spread Img 4388", category: "Catering" },
  { src: "/images/catering/img-4389.webp", alt: "Daily Spread Img 4389", category: "Catering" },
  { src: "/images/catering/img-4390.webp", alt: "Daily Spread Img 4390", category: "Catering" },
  { src: "/images/catering/img-4400.webp", alt: "Daily Spread Img 4400", category: "Catering" },
  { src: "/images/catering/img-4412.webp", alt: "Daily Spread Img 4412", category: "Catering" },
  { src: "/images/catering/img-4438.webp", alt: "Daily Spread Img 4438", category: "Catering" },
  { src: "/images/catering/img-4440.webp", alt: "Daily Spread Img 4440", category: "Catering" },
  { src: "/images/catering/img-4441.webp", alt: "Daily Spread Img 4441", category: "Catering" },
  { src: "/images/catering/img-4462.webp", alt: "Daily Spread Img 4462", category: "Catering" },
  { src: "/images/catering/img-4463.webp", alt: "Daily Spread Img 4463", category: "Catering" },
  { src: "/images/catering/img-4464.webp", alt: "Daily Spread Img 4464", category: "Catering" },
  { src: "/images/catering/img-4465.webp", alt: "Daily Spread Img 4465", category: "Catering" },
  { src: "/images/catering/img-4466.webp", alt: "Daily Spread Img 4466", category: "Catering" },
  { src: "/images/catering/img-4467.webp", alt: "Daily Spread Img 4467", category: "Catering" },
  { src: "/images/catering/img-4468.webp", alt: "Daily Spread Img 4468", category: "Catering" },
  { src: "/images/catering/img-4469.webp", alt: "Daily Spread Img 4469", category: "Catering" },
  { src: "/images/catering/img-4470.webp", alt: "Daily Spread Img 4470", category: "Catering" },
  { src: "/images/catering/img-4471.webp", alt: "Daily Spread Img 4471", category: "Catering" },
  { src: "/images/catering/img-4472.webp", alt: "Daily Spread Img 4472", category: "Catering" },
  { src: "/images/catering/img-4473.webp", alt: "Daily Spread Img 4473", category: "Catering" },
  { src: "/images/catering/img-4474.webp", alt: "Daily Spread Img 4474", category: "Catering" },
  { src: "/images/catering/img-4475.webp", alt: "Daily Spread Img 4475", category: "Catering" },
  { src: "/images/catering/img-4476.webp", alt: "Daily Spread Img 4476", category: "Catering" },
  { src: "/images/catering/img-4477.webp", alt: "Daily Spread Img 4477", category: "Catering" },
  { src: "/images/catering/img-4478.webp", alt: "Daily Spread Img 4478", category: "Catering" },
  { src: "/images/catering/img-4481.webp", alt: "Daily Spread Img 4481", category: "Catering" },
  { src: "/images/catering/img-4482.webp", alt: "Daily Spread Img 4482", category: "Catering" },
  { src: "/images/catering/img-4483.webp", alt: "Daily Spread Img 4483", category: "Catering" },
  { src: "/images/catering/img-4515.webp", alt: "Daily Spread Img 4515", category: "Catering" },
  { src: "/images/catering/img-4541.webp", alt: "Daily Spread Img 4541", category: "Catering" },
  { src: "/images/catering/img-4542.webp", alt: "Daily Spread Img 4542", category: "Catering" },
  { src: "/images/catering/img-4543.webp", alt: "Daily Spread Img 4543", category: "Catering" },
  { src: "/images/catering/img-4606.webp", alt: "Daily Spread Img 4606", category: "Catering" },
  { src: "/images/catering/img-4607.webp", alt: "Daily Spread Img 4607", category: "Catering" },
  { src: "/images/catering/img-4608.webp", alt: "Daily Spread Img 4608", category: "Catering" },
  { src: "/images/catering/img-4740.webp", alt: "Daily Spread Img 4740", category: "Catering" },
  { src: "/images/catering/img-4741.webp", alt: "Daily Spread Img 4741", category: "Catering" },
  { src: "/images/catering/img-4743.webp", alt: "Daily Spread Img 4743", category: "Catering" },
  { src: "/images/catering/img-4762.webp", alt: "Daily Spread Img 4762", category: "Catering" },
  { src: "/images/catering/img-4853.webp", alt: "Daily Spread Img 4853", category: "Catering" },
  { src: "/images/catering/img-4856.webp", alt: "Daily Spread Img 4856", category: "Catering" },
  { src: "/images/catering/img-4857.webp", alt: "Daily Spread Img 4857", category: "Catering" },
  { src: "/images/catering/img-4925.webp", alt: "Daily Spread Img 4925", category: "Catering" },
  { src: "/images/catering/img-4926.webp", alt: "Daily Spread Img 4926", category: "Catering" },
  { src: "/images/catering/img-4927.webp", alt: "Daily Spread Img 4927", category: "Catering" },
  { src: "/images/catering/img-5100.webp", alt: "Daily Spread Img 5100", category: "Catering" },
  { src: "/images/catering/img-5102.webp", alt: "Daily Spread Img 5102", category: "Catering" },
  { src: "/images/catering/img-5146.webp", alt: "Daily Spread Img 5146", category: "Catering" },
  { src: "/images/catering/img-5147.webp", alt: "Daily Spread Img 5147", category: "Catering" },
  { src: "/images/catering/img-5173.webp", alt: "Daily Spread Img 5173", category: "Catering" },
  { src: "/images/catering/img-5174.webp", alt: "Daily Spread Img 5174", category: "Catering" },
  { src: "/images/catering/img-5177.webp", alt: "Daily Spread Img 5177", category: "Catering" },
  { src: "/images/catering/img-5201.webp", alt: "Daily Spread Img 5201", category: "Catering" },
  { src: "/images/catering/img-5202.webp", alt: "Daily Spread Img 5202", category: "Catering" },
  { src: "/images/catering/img-5206.webp", alt: "Daily Spread Img 5206", category: "Catering" },
  { src: "/images/catering/img-5727.webp", alt: "Daily Spread Img 5727", category: "Catering" },
  { src: "/images/catering/img-5897.webp", alt: "Daily Spread Img 5897", category: "Catering" },
  { src: "/images/catering/img-6041.webp", alt: "Daily Spread Img 6041", category: "Catering" },
  { src: "/images/catering/img-6042.webp", alt: "Daily Spread Img 6042", category: "Catering" },
  { src: "/images/catering/img-6043.webp", alt: "Daily Spread Img 6043", category: "Catering" },
  { src: "/images/catering/img-6044.webp", alt: "Daily Spread Img 6044", category: "Catering" },
  { src: "/images/catering/img-6045.webp", alt: "Daily Spread Img 6045", category: "Catering" },
  { src: "/images/catering/img-6046.webp", alt: "Daily Spread Img 6046", category: "Catering" },
  { src: "/images/catering/img-8773.webp", alt: "Daily Spread Img 8773", category: "Catering" },
  { src: "/images/catering/img-9424.webp", alt: "Daily Spread Img 9424", category: "Catering" },
  { src: "/images/catering/img-9425.webp", alt: "Daily Spread Img 9425", category: "Catering" },
  { src: "/images/catering/img-9426.webp", alt: "Daily Spread Img 9426", category: "Catering" },
  { src: "/images/catering/img-9427.webp", alt: "Daily Spread Img 9427", category: "Catering" },
  { src: "/images/catering/img-9429.webp", alt: "Daily Spread Img 9429", category: "Catering" },
  { src: "/images/catering/img-9430.webp", alt: "Daily Spread Img 9430", category: "Catering" },
  { src: "/images/catering/img-9431.webp", alt: "Daily Spread Img 9431", category: "Catering" },
  { src: "/images/catering/img-9433.webp", alt: "Daily Spread Img 9433", category: "Catering" },
  { src: "/images/catering/italian-bruschetta-with-tomato.webp", alt: "Daily Spread Italian Bruschetta With Tomato", category: "Catering" },
  { src: "/images/catering/oven-roast-chicken.webp", alt: "Daily Spread Oven Roast Chicken", category: "Catering" },
  { src: "/images/catering/pork-tenderloin-with-apricot-drizzle.webp", alt: "Daily Spread Pork Tenderloin With Apricot Drizzle", category: "Catering" },
  { src: "/images/catering/primavera-chicken-1.webp", alt: "Daily Spread Primavera Chicken 1", category: "Catering" },
  { src: "/images/catering/pulled-pork-sliders.webp", alt: "Daily Spread Pulled Pork Sliders", category: "Catering" },
  { src: "/images/catering/resized-part-1681827882130-resized-20230412-180229.webp", alt: "Daily Spread Resized Part 1681827882130 Resized 20230412 180229", category: "Catering" },
  { src: "/images/catering/resized-part-1681827882243-resized-20230412-180240.webp", alt: "Daily Spread Resized Part 1681827882243 Resized 20230412 180240", category: "Catering" },
  { src: "/images/catering/resized-resized-20230412-180250.webp", alt: "Daily Spread Resized Resized 20230412 180250", category: "Catering" },
  { src: "/images/catering/tuscan-angel-hair-pasta.webp", alt: "Daily Spread Tuscan Angel Hair Pasta", category: "Catering" },
  { src: "/images/catering/wedding-buffet-1.webp", alt: "Daily Spread Wedding Buffet 1", category: "Catering" },
  { src: "/images/catering/wedding-charcuterie.webp", alt: "Daily Spread Wedding Charcuterie", category: "Catering" },
  { src: "/images/desserts/2022-christmas-catering-table-2-v-1.webp", alt: "Daily Spread 2022 Christmas Catering Table 2 V 1", category: "Desserts" },
  { src: "/images/desserts/2022-christmas-catering-table-v-1.webp", alt: "Daily Spread 2022 Christmas Catering Table V 1", category: "Desserts" },
  { src: "/images/desserts/apple-pecan-cake.webp", alt: "Daily Spread Apple Pecan Cake", category: "Desserts" },
  { src: "/images/desserts/baptism-cross-cookies.webp", alt: "Daily Spread Baptism Cross Cookies", category: "Desserts" },
  { src: "/images/desserts/birthday-decorated-cookies.webp", alt: "Daily Spread Birthday Decorated Cookies", category: "Desserts" },
  { src: "/images/desserts/birthday-party-catering-1.webp", alt: "Daily Spread Birthday Party Catering 1", category: "Desserts" },
  { src: "/images/desserts/birthday-party-catering.webp", alt: "Daily Spread Birthday Party Catering", category: "Desserts" },
  { src: "/images/desserts/black-forest-cake-with-chocolate-cage-display.webp", alt: "Daily Spread Black Forest Cake With Chocolate Cage Display", category: "Desserts" },
  { src: "/images/desserts/black-forest-cake-with-chocolate-cage.webp", alt: "Daily Spread Black Forest Cake With Chocolate Cage", category: "Desserts" },
  { src: "/images/desserts/black-forest-cake.webp", alt: "Daily Spread Black Forest Cake", category: "Desserts" },
  { src: "/images/desserts/blueberry-muffin.webp", alt: "Daily Spread Blueberry Muffin", category: "Desserts" },
  { src: "/images/desserts/catering-dessert-table-set-up.webp", alt: "Daily Spread Catering Dessert Table Set Up", category: "Desserts" },
  { src: "/images/desserts/choc-rasp-cake.webp", alt: "Daily Spread Choc Rasp Cake", category: "Desserts" },
  { src: "/images/desserts/christmas-cookies.webp", alt: "Daily Spread Christmas Cookies", category: "Desserts" },
  { src: "/images/desserts/coconut-cake-w-lemon-filling.webp", alt: "Daily Spread Coconut Cake W Lemon Filling", category: "Desserts" },
  { src: "/images/desserts/dipped-strawberries.webp", alt: "Daily Spread Dipped Strawberries", category: "Desserts" },
  { src: "/images/desserts/fruit-danish.webp", alt: "Daily Spread Fruit Danish", category: "Desserts" },
  { src: "/images/desserts/halloween-cookies-1.webp", alt: "Daily Spread Halloween Cookies 1", category: "Desserts" },
  { src: "/images/desserts/halloween-cookies-2.webp", alt: "Daily Spread Halloween Cookies 2", category: "Desserts" },
  { src: "/images/desserts/halloween-cookies.webp", alt: "Daily Spread Halloween Cookies", category: "Desserts" },
  { src: "/images/desserts/italian-cream-cake.webp", alt: "Daily Spread Italian Cream Cake", category: "Desserts" },
  { src: "/images/desserts/key-lime-pie.webp", alt: "Daily Spread Key Lime Pie", category: "Desserts" },
  { src: "/images/desserts/king-cake-personal.webp", alt: "Daily Spread King Cake Personal", category: "Desserts" },
  { src: "/images/desserts/lemon-raspberry-layer-cake-display.webp", alt: "Daily Spread Lemon Raspberry Layer Cake Display", category: "Desserts" },
  { src: "/images/desserts/monster-truck-birthday-cake.webp", alt: "Daily Spread Monster Truck Birthday Cake", category: "Desserts" },
  { src: "/images/desserts/monster-truck-birthday-cupcakes.webp", alt: "Daily Spread Monster Truck Birthday Cupcakes", category: "Desserts" },
  { src: "/images/desserts/red-velvet-white-choc-cheesecake-1display.webp", alt: "Daily Spread Red Velvet White Choc Cheesecake 1Display", category: "Desserts" },
  { src: "/images/desserts/snowflake-birthday-cookies.webp", alt: "Daily Spread Snowflake Birthday Cookies", category: "Desserts" },
  { src: "/images/desserts/spec-ord-petitfour-1.webp", alt: "Daily Spread Spec Ord Petitfour 1", category: "Desserts" },
  { src: "/images/desserts/spec-ord-petitfour-2.webp", alt: "Daily Spread Spec Ord Petitfour 2", category: "Desserts" },
  { src: "/images/desserts/unicorn-birthday-cake.webp", alt: "Daily Spread Unicorn Birthday Cake", category: "Desserts" },
  { src: "/images/desserts/unicorn-birthday-cupcakes.webp", alt: "Daily Spread Unicorn Birthday Cupcakes", category: "Desserts" }
];

export default function Gallery() {
  const [active, setActive] = useState("All");

  useEffect(() => {
    document.title = "Gallery | Daily Spread — Catering & Dessert Photos";
  }, []);

  const filtered = useMemo(() => {
    return active === "All" ? IMAGES : IMAGES.filter((img) => img.category === active);
  }, [active]);

  return (
    <>
      <section className="py-24 md:py-32 bg-foreground text-primary-foreground text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 font-body">
            Gallery
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            A Visual Feast
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto font-body">
            Browse photos of our catering spreads, chef-prepared service, and desserts.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((img, i) => (
              <article
                key={`${img.src}-${i}`}
                className="rounded-xl overflow-hidden bg-card shadow-md border border-border/40 group"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-secondary">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 bg-card">
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                    {img.category}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
