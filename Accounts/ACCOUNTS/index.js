//modulos 
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

operation()

function operation() {

    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: ['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair'],
    },
]).then((answer) => {
    const action = answer['action']

    if (action === 'Criar Conta') {
        createAccount()
    }
    else if (action == 'Consultar Saldo') {

    }
    else if (action === 'Depositar') {

    }
    else if (action === 'Sacar') {

    }
    else if (action === 'Sair') {
        console.log(chalk.bgBlue.black("Obrigado por usar o Accounts"))
        process.exit()
    }
})
  .catch(err => {
    console.log(err)
})
}

// create an account
function createAccount() {
    console.log(chalk.bgGreen.black('Parabens por escolher nosso banco'))
    console.log(chalk.bgGreen.black('Defina as opções da sua conta'))

    buildAccount()
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para sua conta:',
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        console.info(accountName)

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(
                chalk.brRed.black('Esta conta já existe, escolha outro nome')
            )
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance":0', 
        function (err) {
            console.log(err)
        },
       )

        console.log(chalk.green('Conta criada com sucesso')),
        operation()
        
    })
    .catch((err) => console.log(err))
}