/*
========================================================================================================
ABAIKAN BLOCK CODE INI
========================================================================================================
*/
const Restriction = require("hacktiv8-restriction");
const { execSync } = require("child_process");
const fs = require("fs");

const reconstructedFilename = "reconstructed.js";

const grade = (nama, nilai, absen) => {
  let solution = fs.readFileSync("./1.js", "utf-8");

  solution = solution.replace(
    /(let|var) nama .*/,
    // to handle undefined or null, it should not be quoted
    `$1 nama = ${typeof nama === "string" ? `"${nama}"` : nama}`
  );
  solution = solution.replace(/(let|var) nilai .*/, `$1 nilai = ${nilai}`);
  solution = solution.replace(/(let|var) absen .*/, `$1 absen = ${absen}`);

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
describe("Graduates", () => {
  describe("Tes tidak lulus", () => {
    it("should show tidak lulus when nilai < 70 (15)", () => {
      let [nama, nilai, absen] = ["Hana", 69, 3];
      expect(grade(nama, nilai, absen)).toContain("tidak lulus");
      expect(grade(nama, nilai, absen)).toContain(nama);
    });
    it("should show tidak lulus when absen 5 kali (15)", () => {
      let [nama, nilai, absen] = ["Ananda", 89, 5];
      expect(grade(nama, nilai, absen)).toContain("tidak lulus");
      expect(grade(nama, nilai, absen)).toContain(nama);
    });
    it("should show tidak lulus when nilai < 70 and absen >= 5 (20)", () => {
      let [nama, nilai, absen] = ["Gilang", 69, 7];
      expect(grade(nama, nilai, absen)).toContain("tidak lulus");
      expect(grade(nama, nilai, absen)).toContain(nama);
    });
  });
  describe("Test lulus", () => {
    it("should show lulus when nilai 70 absen 3 (25)", () => {
      let [nama, nilai, absen] = ["Hani", 70, 3];
      expect(grade(nama, nilai, absen)).toContain("lulus");
      expect(grade(nama, nilai, absen)).toContain(nama);
    });
    it("should show lulus when nilai 90 absen 0 (25)", () => {
      let [nama, nilai, absen] = ["Ivanka", 90, 0];
      expect(grade(nama, nilai, absen)).toContain("lulus");
      expect(grade(nama, nilai, absen)).toContain(nama);
    });
  });

  it("should check restriction rules (-30)", async () => {
    const checkRestriction = new Restriction("../1.js");
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
});
