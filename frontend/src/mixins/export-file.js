import axios from 'axios'

export default {
  methods: {
    exportFile(event, data) {
      event.target.disabled = true
      axios
        .get(`${data.requestPath}.${data.type}`, {
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

          event.target.disabled = false
          downloadLink.remove()
        })
        .catch(error => {
          event.target.disabled = false
          throw error
        })
    }
  }
}
