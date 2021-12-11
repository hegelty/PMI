#pragma warning(disable:4996)
#pragma warning(disable:6031)

#include <stdio.h>

void help()
{
	printf("\n0. 종료\n");
	printf("1. %%농도 -> 몰농도\n");
	printf("2. %%농도 -> 몰랄농도\n");
	printf("3. 몰농도 -> %%농도\n");
	printf("4. 몰랄농도 -> %%농도\n");
	printf("5. 몰농도 -> 몰랄농도\n");
	printf("6. 몰랄농도 -> 몰농도\n");
	printf("원하는 기능을 선택하세요 : ");
}
double percent_to_molarity(double percent, double molar_mass, double density)
{
	return percent / molar_mass * density * 10;
}
double percent_to_molality(double percent, double molar_mass, double density)
{
	return percent / molar_mass / (100 - percent) * 100;
}
double molarity_to_percent(double molarity, double molar_mass, double density)
{
	return molarity * molar_mass / 10 * density;
}
double molarity_to_molality(double molarity, double molar_mass, double density)
{
	return molarity / (density - (molarity*molar_mass/1000));
}
double molality_to_molarity(double molality, double molar_mass, double density)
{
	return molality / (((molality * molar_mass) / 1000 + 1) / density);
}
double molality_to_percent(double molality, double molar_mass, double density)
{
	return molarity_to_percent(molality_to_molarity(molality, molar_mass, density), molar_mass, density);
}

int main()
{
	printf("#########################\n      농도 변환기\n제작자 : 나태양(hegelty)\n#########################\n\n");
	while (1)
	{
		int input = 0;
		help();
		scanf("%d", &input);
		if (input < 0 || input>6)
		{
			printf("0~6사이의 값을 입력하세요.\n");
			continue;
		}
		if (input == 0) return 0;

		double concentration, molar_mass, density;
		while (1)
		{
			printf("농도를 입력하세요(단위 생략) : ");
			scanf("%lf", &concentration);
			rewind(stdin);
			if (concentration <= 0) printf("농도는 양의 값만 가능합니다.\n");
			else if (input < 3 && concentration >= 100) printf("%%농도는 100 이하여야 합니다.\n");
			else break;
		}
		while (1)
		{
			printf("용질의 몰질량을 입력하세요 : ");
			scanf("%lf", &molar_mass);
			rewind(stdin);
			if (molar_mass <= 0) printf("몰질량은 양의 값만 가능합니다.\n");
			else break;
		}
		while (1)
		{
			printf("용액의 밀도(g/ml)를 입력하세요 : ");
			scanf("%lf", &density);
			rewind(stdin);
			if (density <= 0) printf("밀도는 양의 값만 가능합니다.\n");
			else break;
		}

		printf("----------\n");
		switch (input)
		{
		case 1: printf("%lf %%는 %lf M입니다.\n\n", concentration, percent_to_molarity(concentration, molar_mass, density)); break;
		case 2: printf("%lf %%는 %lf m입니다.\n\n", concentration, percent_to_molality(concentration, molar_mass, density)); break;
		case 3: printf("%lf M은 %lf %%입니다.\n\n", concentration, molarity_to_percent(concentration, molar_mass, density)); break;
		case 4: printf("%lf m는 %lf %%입니다.\n\n", concentration, molality_to_percent(concentration, molar_mass, density)); break;
		case 5: printf("%lf M은 %lf m입니다.\n\n", concentration, molarity_to_molality(concentration, molar_mass, density)); break;
		case 6: printf("%lf m는 %lf M입니다.\n\n", concentration, molality_to_molarity(concentration, molar_mass, density)); break;
		}


		int back;
		printf("초기화면으로 돌아가시려면 1을, 아니면 다른 키를 입력하세요.");
		scanf("%d", &back);
		if (back != 1) return 0;
	}
}
