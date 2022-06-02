<script setup lang="ts">
import { logout } from '../ts/api'
import { adminToken, wsName } from '../ts/cookie';
import { useUserStore } from '../store/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const logoutFn = () => {
    logout().then(res => {
        if (!res) return
        adminToken.remove()
        wsName.remove()
        userStore.updateToken('')
        router.push({ path: '/' });
    })
}

onMounted(() => {
    logoutFn()
})


</script>