/*
========================================================================================================
ABAIKAN BLOCK CODE INI
========================================================================================================
*/
const Restriction = require("hacktiv8-restriction");
const { execSync } = require("child_process");
const fs = require("fs");
const checkRestriction = require("hacktiv8-restriction");
const solutionPath = "../2.js";

const reconstructedFilename = "reconstructed.js";

const grade = (nama, nilai) => {
  let solution = fs.readFileSync("./2.js", "utf-8");

  solution = solution.replace(
    /(let|var) nama .*/,
    // to handle undefined or null, it should not be quoted
    `$1 nama = ${typeof nama === "string" ? `"${nama}"` : nama}`
  );
  solution = solution.replace(/(let|var) nilai .*/, `$1 nilai = ${nilai}`);

  fs.writeFileSync(reconstructedFilename, solution);

  return String(execSync(`node ${reconstructedFilename}`));
};

afterAll(() => {
  if (fs.existsSync(reconstructedFilename)) {
    fs.unlinkSync(reconstructedFilename);
  }
});
/*
========================================================================================================
ABAIKAN BLOCK CODE INI
========================================================================================================
*/

/*
========================================================================================================
PASTIKAN SOLUSI YANG DITULIS SESUAI DENGAN SKENARIO DIBAWAH INI
========================================================================================================
*/
describe("Grade Students", () => {
  it("should check restriction rules (-30)", async () => {
    const checkRestriction = new Restriction("../2.js");
    checkRestriction.rules = [
      "match",
      "split",
      "concat",
      "pop",
      "push",
      "unshift",
      "shift",
    ];
    const restrictedUse = await checkRestriction.readCode();
    expect(restrictedUse).toBe(null);
  });

  it('Should print "Nilai Invalid" if score out of range 0-100 (20)', () => {
    const student1 = "Andhika";
    const student2 = "Andhiki";
    const score1 = -1;
    const score2 = 101;

    const result1 = grade(student1, score1);
    const result2 = grade(student2, score2);

    expect(result1).toMatch("Nilai Invalid");
    expect(result2).toMatch("Nilai Invalid");
  });

  it("should print the correct result (80)", () => {
    const student1 = "Andhika";
    const student2 = "Robert";
    const student3 = "Ajeng";
    const student4 = "Aryo";
    const student5 = "Riki";
    const score1 = 100;
    const score2 = 66;
    const score3 = 50;
    const score4 = 49;
    const score5 = 0;
    const result1 = grade(student1, score1);
    const result2 = grade(student2, score2);
    const result3 = grade(student3, score3);
    const result4 = grade(student4, score4);
    const result5 = grade(student5, score5);

    expect(result1).toMatch("nama: Andhika; score: A");
    expect(result2).toMatch("nama: Robert; score: B");
    expect(result3).toMatch("nama: Ajeng; score: C");
    expect(result4).toMatch("nama: Aryo; score: D");
    expect(result5).toMatch("nama: Riki; score: E");
  });
});
