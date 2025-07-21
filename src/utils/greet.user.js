export const dashboardTimestamp = () => {
    const date = new Date();

    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
}

export function greetUser(date = new Date()) {
    const hour = date.getHours();
  
    if (hour >= 5 && hour < 12) return "Good morning!";
    if (hour >= 12 && hour < 17) return "Good afternoon!";
    if (hour >= 17 && hour < 21) return "Good evening!";
    return "Good night!";
  }
  