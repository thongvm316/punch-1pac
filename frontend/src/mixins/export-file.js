import axios from 'axios'

export default {
  methods: {
    exportFile(data) {
      this.isDisable = true
      axios
        .get(`/groups/${this.$route.params.id}/report.${data.type}`, {
          headers: { Accept: `application/${data.type}` },
          params: { date: this.dateData.date, date_type: this.dateData.type },
          responseType: 'blob'
        })
        .then(response => {
          const downloadLink = document.createElement('a')
          downloadLink.href = window.URL.createObjectURL(new Blob([response.data]))
          let fileName = `${data.fileName}.${data.type}`
          downloadLink.setAttribute('download', fileName)
          document.body.appendChild(downloadLink)
          downloadLink.click()

          this.isDisable = false
          downloadLink.remove()
        })
        .catch(error => {
          this.isDisable = false
          throw error
        })
    }
  }
}
