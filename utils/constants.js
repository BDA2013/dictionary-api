const dictionaries = [
    {
      title: 'General Geology',
      tags: ['geology'],
      _id: 0,
    },
    {
      title: 'General Chemistry',
      tags: ['chemistry'],
      _id: 1,
    },
    {
      title: 'Medical Terms',
      tags: ['medical'],
      _id: 2,
    },
    {
      title: 'General Biology',
      tags: ['biology'],
      _id: 3,
    },
    {
      title: 'Basic French',
      tags: ['french'],
      _id: 4,
    },
  ];

const references = `
  General Biology:
  \thttps://www.vocabulary.com/lists/143915
  
  General Geology:
  \tGeneral Dictionary of Geology, by Kurniawan, Mc. Kenzie and Putri, (2009)
  
  General Chemistry:
  \thttps://www.fkit.unizg.hr/_news/32312/1%20-%20Basic%20Chemistry%20Vocabulary%20List.pdf
  
  Medical Terms:
  \thttps://file.lacounty.gov/SDSInter/dmh/159358_AMAGlossaryofMedicalTerms_Ver1.0.pdf
  
  Basic French:
  \thttps://strommeninc.com/1000-most-common-french-words-frequency-vocabulary/
  `;

module.exports = { dictionaries, references };