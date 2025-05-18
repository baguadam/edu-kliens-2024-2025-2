"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { Students, Teachers, Lessons, sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */

const dates = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const getDateForDay = (day) => {
  const today = new Date();
  const currentDayIndex = today.getDay();
  const targetDayIndex = dates.indexOf(day.toUpperCase());

  if (targetDayIndex === -1) {
    throw new Error("Invalid day provided");
  }

  const diff = targetDayIndex - currentDayIndex;

  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + diff);

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, "0");
  const dayOfMonth = String(targetDate.getDate()).padStart(2, "0");

  return `${year}.${month}.${dayOfMonth} 15:00`;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await sequelize.transaction();

    try {
      const teachers = [];
      const students = [];
      const lessons = [];
      const teachersCount = faker.number.int({ min: 2, max: 5 });
      const studentsCount = faker.number.int({ min: 6, max: 12 });
      const subjects = [
        "Matematika",
        "Fizika",
        "Informatika",
        "Nyelvten",
        "Irodalom",
        "Angol",
        "Német",
        "Történelem",
      ];

      for (let i = 0; i < teachersCount; i++) {
        const password = "almafa";
        const teacher = await Teachers.create(
          {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: password,
            subjects: faker.helpers.arrayElements(subjects, { min: 1, max: 3 }),
          },
          { transaction }
        );

        teachers.push(teacher);
      }

      for (let i = 0; i < studentsCount; i++) {
        const teacher = faker.helpers.arrayElement(teachers);

        const lessonDates = faker.helpers.arrayElements(dates, {
          min: 1,
          max: 3,
        });

        const student = await Students.create(
          {
            name: faker.person.fullName(),
            price: faker.number.int({ min: 4000, max: 6000 }),
            subject: faker.helpers.arrayElement(teacher.subjects),
            lessonDates: lessonDates,
            TeacherId: teacher.id,
          },
          { transaction, hooks: false }
        );

        for (let j = 0; j < lessonDates.length; j++) {
          const lesson = await Lessons.create(
            {
              date: getDateForDay(lessonDates[j]),
              status: "PENDING",
              paid: false,
              StudentId: student.id,
              TeacherId: teacher.id,
            },
            { transaction }
          );

          lessons.push(lesson);
        }

        students.push(student);
      }

      await transaction.commit();
      console.log("The DatabaseSeeder ran successfully!");
    } catch (error) {
      await transaction.rollback();
      console.error(
        "ROLLBACK - an error occured while seeding the database!",
        error
      );
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await sequelize.transaction();
    try {
      await queryInterface.bulkDelete("Students", null, {});
      await queryInterface.bulkDelete("Teachers", null, {});
      await queryInterface.bulkDelete("Lessons", null, {});
      await transaction.commit();
    } catch (error) {
      console.error("Failed to delete seed data:", error);
    }
  },
};
