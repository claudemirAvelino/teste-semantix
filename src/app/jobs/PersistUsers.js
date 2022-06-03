
export default {
    key: 'PersistUsers',
    options: {
        attempts: 1,
        repeat: {
            cron: "5 * * * *"
        }
    },
    async handle({ data }) {
        console.log('teste')
    }
}
