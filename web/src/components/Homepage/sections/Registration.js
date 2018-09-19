/* eslint-disable no-nested-ternary */
import React, { Component } from 'react'
import ScrollableAnchor from 'react-scrollable-anchor'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

class RegistrationSection extends Component {
  constructor(props) {
    super(props)
    const registrationOpens = new Date('2018-10-02T05:30:00.000Z').getTime()
    const currentTime = new Date().getTime()
    const difference = registrationOpens - currentTime
    this.state = {
      remainingTime: difference > 0 ? difference : -1,
    }
    this.timer = null
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.tick(),
      1000,
    )
  }

  tick() {
    if (this.state.remainingTime > 0) {
      this.setState({
        remainingTime: this.state.remainingTime - 1000,
      })
    } else {
      clearInterval(this.timer)
    }
  }

  render() {
    const timer = (
      <Card>
        <CardContent>
          <Typography color="textSecondary">
            Registraci spouštíme za
          </Typography>
          <Typography
            variant="headline"
            component="h1"
            style={{ fontSize: '1.9rem', color: '#2196f3', marginBottom: -10 }}>
            {formattedMS(this.state.remainingTime)}
          </Typography>
        </CardContent>
      </Card>
    )
    const codeInput = (
      <Card>
        <CardContent>
          <Typography color="textSecondary">
            Zadejte školní registrační kód
          </Typography>
          <Typography gutterBottom variant="headline" component="h1">
            INPUT
          </Typography>
        </CardContent>
      </Card>
    )
    return (
      <ScrollableAnchor id="registrace">
        <section className="content-section registration">
          <Grid container justify="center" spacing={24}>
            <Grid item xs={10} sm={8} lg={6}>
              <div className="content-section-heading">
                <h2 className="mb-5">Registrace</h2>
              </div>
              {this.state.remainingTime > 0 ? timer : codeInput}
              <p className="lead">
                Registrovat týmy bude možné od úterý 2.&nbsp;10.&nbsp;2018 7:30 ráno.
                Do té doby si prosím připravte kontaktní údaje na doprovázejícího učitele,
                {' '}<strong>školní registrační kód</strong>,
                název přihlašovaného týmu a celá jména jeho členů.
              </p>
              <br />
              <h2>Nemáte registrační kód?</h2>
              <p className="lead">
                Pokud se vaše škola MaSa již účastnila, nejpozději týden před zahájením registrací
                by registrační kód měl mít pedagog, který týmy posledně přihlašoval.
                Pokud tomu tak není, napište nám na{' '}
                <a href="mailto:maso-soutez@googlegroups.com">maso-soutez@googlegroups.com</a>
                {' '}a my situaci ihned napravíme.
              </p>
              <br />
              <h2>Účastníte se poprvé?</h2>
              <p className="lead">
                To máme radost! Pošlete nám prosím krátký email s kontaktem na vaši školu na {' '}
                <a href="mailto:maso-soutez@googlegroups.com">maso-soutez@googlegroups.com</a>
                {' '}a my vám obratem pošleme pozvánku se všemi potřebnými pokyny.
              </p>
            </Grid>
          </Grid>
        </section>
      </ScrollableAnchor>
    )

  }
}

function formattedMS(ms) {
  let result = ''
  const sec = Math.round(ms / 1000)
  const days = Math.floor(sec / (60 * 60 * 24))
  if (days > 0) {
    result += `${days} ${days === 1 ? 'den' : [2, 3, 4].includes(days) ? 'dny' : 'dní'} `
  }
  const hours = Math.floor(sec / (60 * 60)) - (days * 24)
  if (result !== '' || hours > 0) {
    result += `${hours} ${hours === 1 ? 'hodinu' : [2, 3, 4].includes(hours) ? 'hodiny' : 'hodin'} `
  }
  const minutes = Math.floor(sec / 60) - ((hours + (days * 24)) * 60)
  if (result !== '' || minutes > 0) {
    result += `${minutes} ${minutes === 1 ? 'minutu' : [2, 3, 4].includes(minutes) ? 'minuty' : 'minut'} ` // eslint-disable-line max-len
  }
  const remainingSecs = sec - ((minutes + ((hours + (days * 24)) * 60)) * 60)
  const secondsNoun = remainingSecs === 1 ? 'vteřinu' : [2, 3, 4].includes(remainingSecs) ? 'vteřiny' : 'vteřin' // eslint-disable-line max-len
  return `${result !== '' ? `${result}a ` : ''}${remainingSecs} ${secondsNoun}`
}

export default RegistrationSection
