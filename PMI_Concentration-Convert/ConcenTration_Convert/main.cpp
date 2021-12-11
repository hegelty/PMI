#pragma warning(disable:4996)
#pragma warning(disable:6031)

#include <stdio.h>

void help()
{
	printf("\n0. ����\n");
	printf("1. %%�� -> ����\n");
	printf("2. %%�� -> ������\n");
	printf("3. ���� -> %%��\n");
	printf("4. ������ -> %%��\n");
	printf("5. ���� -> ������\n");
	printf("6. ������ -> ����\n");
	printf("���ϴ� ����� �����ϼ��� : ");
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
	printf("#########################\n      �� ��ȯ��\n������ : ���¾�(hegelty)\n#########################\n\n");
	while (1)
	{
		int input = 0;
		help();
		scanf("%d", &input);
		if (input < 0 || input>6)
		{
			printf("0~6������ ���� �Է��ϼ���.\n");
			continue;
		}
		if (input == 0) return 0;

		double concentration, molar_mass, density;
		while (1)
		{
			printf("�󵵸� �Է��ϼ���(���� ����) : ");
			scanf("%lf", &concentration);
			rewind(stdin);
			if (concentration <= 0) printf("�󵵴� ���� ���� �����մϴ�.\n");
			else if (input < 3 && concentration >= 100) printf("%%�󵵴� 100 ���Ͽ��� �մϴ�.\n");
			else break;
		}
		while (1)
		{
			printf("������ �������� �Է��ϼ��� : ");
			scanf("%lf", &molar_mass);
			rewind(stdin);
			if (molar_mass <= 0) printf("�������� ���� ���� �����մϴ�.\n");
			else break;
		}
		while (1)
		{
			printf("����� �е�(g/ml)�� �Է��ϼ��� : ");
			scanf("%lf", &density);
			rewind(stdin);
			if (density <= 0) printf("�е��� ���� ���� �����մϴ�.\n");
			else break;
		}

		printf("----------\n");
		switch (input)
		{
		case 1: printf("%lf %%�� %lf M�Դϴ�.\n\n", concentration, percent_to_molarity(concentration, molar_mass, density)); break;
		case 2: printf("%lf %%�� %lf m�Դϴ�.\n\n", concentration, percent_to_molality(concentration, molar_mass, density)); break;
		case 3: printf("%lf M�� %lf %%�Դϴ�.\n\n", concentration, molarity_to_percent(concentration, molar_mass, density)); break;
		case 4: printf("%lf m�� %lf %%�Դϴ�.\n\n", concentration, molality_to_percent(concentration, molar_mass, density)); break;
		case 5: printf("%lf M�� %lf m�Դϴ�.\n\n", concentration, molarity_to_molality(concentration, molar_mass, density)); break;
		case 6: printf("%lf m�� %lf M�Դϴ�.\n\n", concentration, molality_to_molarity(concentration, molar_mass, density)); break;
		}


		int back;
		printf("�ʱ�ȭ������ ���ư��÷��� 1��, �ƴϸ� �ٸ� Ű�� �Է��ϼ���.");
		scanf("%d", &back);
		if (back != 1) return 0;
	}
}
