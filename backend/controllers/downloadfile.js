

exports.downloadfile = async (req, res) => {
    try {
        const file = `files/${req.params.id}`
        res.download(file);
      } catch (error) {
          console.log('ERROR LIST==>', error.message);
      }
}