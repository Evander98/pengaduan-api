const db = require("../database");
const natural = require("natural")
const { VSM, Cosine } = require('vector-space-model-similarity')

module.exports = {
  searchComplaint : (req, res) => {
    const filtering = (sentence, common) => {
      var wordArr = sentence.match(/\w+/g),
        commonObj = {},
        uncommonArr = [],
        word, i;
      
      // common = common.split(',');
      for ( i = 0; i < common.length; i++ ) {
        commonObj[ common[i].trim() ] = true;
      }
      
      for ( i = 0; i < wordArr.length; i++ ) {
        word = wordArr[i].trim().toLowerCase();
        if ( !commonObj[word] ) {
          uncommonArr.push(word);
        }
      }
      
      return uncommonArr.join(' ');
    }

    db.query("select id_pengaduan, id_pengadu, id_mitra, nama_mitra_kerja, users.nama_lengkap, judul_pengaduan, isi_pengaduan, status, DATE_FORMAT(waktu_pengaduan,'%d-%m-%Y') as tanggal_pengaduan, time(waktu_pengaduan) as waktu_pengaduan from daftar_pengaduan inner join users on daftar_pengaduan.id_pengadu=users.id inner join mitra_kerja on daftar_pengaduan.id_mitra=mitra_kerja.id_mitra_kerja order by id_pengaduan desc", (err, result) => {
      db.query('select kata_filtering from filtering', (err, kataFiltering) => {
        // TfIdf = require("tf-idf-search")
        // tf_idf = new TfIdf()
        let keywords = req.query.keywords
        let filteringArray = [];
        let filteringResult = []
        let stemmingResult = []
        let corpus = []
        let newResult = []

        let documents = []

        for(var i = 0; i < result.length; i++) {
          documents.push(result[i].isi_pengaduan)
        }
        const document = new VSM(documents)

        const idf = document.getIdfVectorized();
        
        let tempKeywords = []
        for(var i = 0; i < keywords.split(" ").length; i++) {
          tempKeywords.push(natural.StemmerId.stem(keywords.split(" ")[i]))
        }
        keywords = tempKeywords.join(" ")

        const query = new VSM([keywords], idf);

        const cosine = Cosine(query.getPowWeightVectorized()[0], document.getPowWeightVectorized());

        for(let i in cosine){
          if(cosine[i] > 0){
            newResult.push({...result[i], similarity: cosine[i]})
          }
        }

        newResult.sort(function (a, b) {
          return b.similarity - a.similarity;
        })
        console.log(newResult);
        res.send(newResult);

        // let tempKeywords = []
        // for(var i = 0; i < keywords.split(" ").length; i++) {
        //   tempKeywords.push(natural.StemmerId.stem(keywords.split(" ")[i]))
        // }
        // keywords = tempKeywords.join(" ")

        // for(let i in kataFiltering){
        //   filteringArray.push(kataFiltering[i].kata_filtering)
        // }
  
        // for(var i = 0; i < result.length; i++) {
        //   filteringResult.push(filtering(result[i].isi_pengaduan, filteringArray))
        // }
        
        // var splitted = ""
        // for(let i in filteringResult) {
        //   splitted = filteringResult[i].split(' ')
        //   stemmingResult = []
        //   for(let j in splitted){
        //     stemmingResult.push(natural.StemmerId.stem(splitted[j]))
        //   }
        //   corpus.push(stemmingResult.join(' '))
        // }

        // tf_idf.createCorpusFromStringArray(corpus);
        // var searchResult = tf_idf.rankDocumentsByQuery(keywords)
        

        // for(let i in searchResult){
        //   if(searchResult[i].similarityIndex > 0){
        //     newResult.push(result[searchResult[i].index])
        //     newResult[i].similarity = searchResult[i].similarityIndex;
        //   }
        // }

        // res.send(newResult);

      })
    })
  }
}